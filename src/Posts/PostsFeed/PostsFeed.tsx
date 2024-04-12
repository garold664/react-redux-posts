import { useDispatch, useSelector } from 'react-redux';
import AddPostForm from '../AddPostForm/AddPostForm';
import { Link, useLocation } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

import { selectAllPosts, fetchPosts } from '../../store/posts/postsSlice';

import styles from './PostsFeed.module.scss';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { RootState } from '../../store/store';

const PostsFeed = () => {
  const location = useLocation();
  console.log(location);
  const posts = useSelector(selectAllPosts);

  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts() as any);
    }
  }, [postsStatus, dispatch]);

  if (!posts.length) {
    return;
  }
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  let content;

  if (postsStatus === 'loading') {
    content = (
      <li>
        <Spinner />
      </li>
    );
  } else if (postsStatus === 'succeeded') {
    content = orderedPosts.map((post) => (
      <li key={post.id} className={styles.post}>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <div>
          <PostAuthor userId={post.userId} />
          <TimeAgo timestamp={post.date} />
        </div>
        <ReactionButtons post={post} />
        <Link className={styles.link} to={`/posts/${post.id}`}>
          read the post
        </Link>
      </li>
    ));
  } else if (postsStatus === 'failed') {
    content = <li>{error}</li>;
  }

  const renderedPosts = (
    <>
      <AddPostForm />

      <ul className={styles.posts}>{content}</ul>
    </>
  );
  return (
    <section className="container">
      <h1 className={styles.title}>All Posts</h1>
      {renderedPosts}
    </section>
  );
};

export default PostsFeed;
