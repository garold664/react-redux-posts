import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import TimeAgo from './TimeAgo';

export const SinglePostPage = () => {
  let { postId } = useParams();
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  );

  console.log(post);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <Link to={`/editPost/${post.id}`}>Edit post</Link>
      </article>
    </section>
  );
};
