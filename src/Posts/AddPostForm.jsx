import React, { useState } from 'react';
import { addPost } from '../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

const AddPostForm = () => {
  const dispatch = useDispatch();

  const users = useSelector((state) => state.users);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [userId, setUserId] = useState('');
  const onTitleChange = (event) => setTitle(event.target.value);
  const onContentChange = (event) => setContent(event.target.value);
  const onAuthorChanged = (event) => setUserId(event.target.value);
  const onSavePost = (event) => {
    event.preventDefault();
    if (title && content) {
      // dispatch(addPost({ id: nanoid(), title, content }));
      // ! Preparing Action Payloads: https://redux.js.org/tutorials/essentials/part-4-using-data#preparing-action-payloads
      //! Now our component doesn't have to worry about what the payload object looks like:
      dispatch(addPost(title, content, userId));
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
    <section>
      <h2>Add a New Post</h2>
      <form onSubmit={onSavePost}>
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
          <option value=""></option>
          {userOptions}
        </select>
        <label htmlFor="postContent">Post Content: </label>
        <textarea
          type="text"
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
