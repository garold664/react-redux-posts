import React, { useState } from 'react';
import { updatePost } from '../store/posts/postsSlice';
import { useDispatch, useSelector } from 'react-redux';

import { useParams, useNavigate } from 'react-router-dom';

const EditPostForm = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);

  const onTitleChange = (event) => setTitle(event.target.value);
  const onContentChange = (event) => setContent(event.target.value);
  const onSavePost = (event) => {
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
          type="text"
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
