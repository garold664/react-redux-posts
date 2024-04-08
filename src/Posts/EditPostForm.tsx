import React, { useState } from 'react';
import { selectPostById, updatePost } from '../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';
import { RootState } from '../store/store';

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );

  const [title, setTitle] = useState(post!.title);
  const [content, setContent] = useState(post!.content);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);
  const onSavePost = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && content) {
      dispatch(updatePost({ id: postId, title, content }));
      navigate(`/posts/${postId}`);
    }
  };
  return (
    <section>
      <h2>Edit Post</h2>
      <form onSubmit={onSavePost}>
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
    </section>
  );
};

export default EditPostForm;
