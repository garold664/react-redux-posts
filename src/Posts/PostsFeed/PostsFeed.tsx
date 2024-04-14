import { useDispatch, useSelector } from 'react-redux';
import AddPostForm from '../AddPostForm/AddPostForm';
import { Link, useLocation } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

import { selectAllPosts, fetchPosts, Post } from '../../store/posts/postsSlice';

import styles from './PostsFeed.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { RootState } from '../../store/store';
import queryString from 'query-string';

function sortPosts(posts: Post[], key: keyof Post, order) {
  if (!posts) return [];
  if (!key) return posts;
  return [...posts].sort((a, b) => {
    if (order === 'asc') return a[key] > b[key] ? 1 : -1;
    if (order === 'desc') return a[key] < b[key] ? 1 : -1;
    return a[key] < b[key] ? -1 : 1;

    // return a[key].localeCompare(b[key]);
  });
}

const PostsFeed = () => {
  const location = useLocation();
  const query = queryString.parse(location.search);
  const posts = useSelector(selectAllPosts);
  const [sortOrder, _setSortOrder] = useState(query.order as 'asc' | 'desc');
  const [sortKey, _setSortKey] = useState<keyof Post>(query.sort as keyof Post);
  const [sortedPosts, setSortedPosts] = useState<Post[] | null>(null);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  useEffect(() => {
    if (postsStatus === 'succeeded') {
      setSortedPosts(sortPosts(posts, sortKey, sortOrder));
    } else {
      setSortedPosts(posts);
    }
  }, [posts, sortKey, postsStatus]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts() as any);
    }
  }, [postsStatus, dispatch]);

  if (!posts.length) {
    return;
  }

  let content;

  if (postsStatus === 'loading') {
    content = (
      <li>
        <Spinner />
      </li>
    );
  } else if (
    postsStatus === 'succeeded' &&
    sortedPosts &&
    sortedPosts?.length > 0
  ) {
    content = sortedPosts.map((post) => (
      <li key={post.id} className={styles.post}>
        <h2>{post.title}</h2>
        {/* <p>{post.id}</p> */}
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
