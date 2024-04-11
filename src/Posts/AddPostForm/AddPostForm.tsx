import React, { useState } from 'react';
import { addNewPost } from '../../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import styles from './AddPostForm.module.scss';
import { RootState } from '../../store/store';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: RootState) => state.users);
  console.log(users);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState(users[0].id);
  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const onContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setContent(event.target.value);
  const onAuthorChanged = (event: React.ChangeEvent<HTMLSelectElement>) =>
    setUserId(event.target.value);
  const onSavePost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title && content) {
      await dispatch(addNewPost({ title, content, userId }) as any).unwrap();
      setTitle('');
      setContent('');
    }
  };

  const canSave = Boolean(title) && Boolean(content) && Boolean(userId);

  const userOptions = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  return (
    <section className={styles.addPost}>
      <h2 className={styles.title}>Add a New Post</h2>
      <form className={styles.form} onSubmit={onSavePost}>
        <label htmlFor="postTitle">Post Title: </label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChange}
        />
        <label htmlFor="postAuthor">Author: </label>
        <select id="postAuthor" value={userId} onChange={onAuthorChanged}>
          {/* <option value=""></option> */}
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChange}
        />
        <button type="submit" disabled={!canSave}>
          Save Post
        </button>
      </form>
    </section>
  );
};

export default AddPostForm;
