import React, { useState } from 'react';
import { Post, selectPostById, updatePost } from '../../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';

import styles from './EditPostForm.module.scss';
const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let post: Post | { title: string; content: string; id: string } | undefined =
    useSelector((state: RootState) => selectPostById(state, postId!));

  if (!post) {
    post = {
      title: '',
      content: '',
      id: '',
    };
  }

  const [title, setTitle] = useState(post!.title);
  const [content, setContent] = useState(post!.content);

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);
  const onSavePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && content && postId) {
      dispatch(updatePost({ id: postId, title, content }) as any);
      navigate(`/posts/${postId}`);
    }
  };
  let element = (
    <article className={styles.post}>
      <h2 className={styles.title}>Edit Post</h2>
      <form className={styles.form} onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="submit">Save Post</button>
      </form>
    </article>
  );

  if (!post!.id) {
    element = (
      <article className={styles.post}>
        <h2>Post not found!</h2>
      </article>
    );
  }

  return <section className="container">{element}</section>;
};

export default EditPostForm;
