import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo';
import { fetchPosts, selectPostById } from '../../store/posts/postsSlice';

import type { RootState } from '../../store/store';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';

import styles from './SinglePostPage.module.scss';

export const SinglePostPage = () => {
  const dispatch = useDispatch();
  const postsStatus = useSelector((state: RootState) => state.posts.status);

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts() as any);
    }
  }, [postsStatus, dispatch]);

  const { postId } = useParams();
  const post = useSelector((state: RootState) =>
    selectPostById(state, postId!)
  );
  if (postsStatus === 'loading' || postsStatus === 'idle') {
    return (
      <section
        className="container"
        style={{ textAlign: 'center', marginTop: '20px' }}
      >
        <Spinner />
      </section>
    );
  }

  if (!post) {
    console.log(postsStatus);
    return (
      <section className="container">
        <h2>Post not found!</h2>
      </section>
    );
  }
  return (
    <section>
      <article className="container">
        <h2 className={styles.title}>{post.title}</h2>
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
