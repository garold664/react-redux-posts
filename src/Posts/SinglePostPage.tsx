import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from './PostAuthor/PostAuthor';
import TimeAgo from './TimeAgo';
import { selectPostById } from '../store/posts/postsSlice';

import type { RootState } from '../store/store';

export const SinglePostPage = () => {
  const { postId } = useParams();
  const post = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );

  // console.log(post);

  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <section>
      <article className="container">
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
