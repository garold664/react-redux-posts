import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { selectAllPosts, fetchPosts, Post } from '../../store/posts/postsSlice';

import styles from './PostsFeed.module.scss';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Spinner/Spinner';
import { RootState } from '../../store/store';
import queryString from 'query-string';
import Sorting, { SortingProps } from '../../components/Sorting/Sorting';
import { User } from '../../store/posts/userSlice';
import SinglePost from '../SinglePost/SinglePost';

type ModifiedPost = Post & { author: string; reactionsNumber: number };

function sortPosts(
  posts: Post[],
  // key: 'title' | 'date' | 'author' | 'reactionsNumber' | 'content',
  key: SortingProps['sortingKey'],
  order: 'asc' | 'desc',
  authors: User[]
) {
  if (!posts) return [];
  if (!key) return posts;
  return [...posts]
    .map((post) => {
      const authorName = authors.find((user) => user.id === post.userId)?.name;
      const reactionsNumber = Object.values(post.reactions).reduce(
        (accum, val) => accum + val,
        0
      );
      return {
        ...post,
        author: authorName || 'Unknown author',
        reactionsNumber,
      };
    })
    .sort((a: ModifiedPost, b: ModifiedPost) => {
      if (key === 'reactionsNumber' && order === 'asc') {
        return a[key] - b[key];
      }
      if (key === 'reactionsNumber' && order === 'desc') {
        return b[key] - a[key];
      }
      if (key === 'reactionsNumber') {
        return a[key] - b[key];
      }
      if (order === 'asc') return a[key].localeCompare(b[key]);
      if (order === 'desc') return b[key].localeCompare(a[key]);
      return a[key].localeCompare(b[key] as string);
    });
}

const PostsFeed = () => {
  const location = useLocation();
  const { sort: sortKey, order: sortOrder } = queryString.parse(
    location.search
  );
  const posts = useSelector(selectAllPosts);

  const [sortedPosts, setSortedPosts] = useState<Post[] | null>(null);
  const postsStatus = useSelector((state: RootState) => state.posts.status);
  const error = useSelector((state: RootState) => state.posts.error);

  const authors = useSelector((state: RootState) => {
    return state.users;
  });

  useEffect(() => {
    if (postsStatus === 'succeeded') {
      setSortedPosts(
        sortPosts(
          posts,
          sortKey as SortingProps['sortingKey'],
          sortOrder as 'asc' | 'desc',
          authors
        )
      );
    } else {
      setSortedPosts(posts);
    }
  }, [posts, sortKey, postsStatus, sortOrder, authors]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === 'idle') {
      dispatch(fetchPosts() as any);
    }
  }, [postsStatus, dispatch]);

  if (!posts.length) {
    return;
  }

  let postsList;

  if (postsStatus === 'loading') {
    postsList = (
      <li>
        <Spinner />
      </li>
    );
  } else if (
    postsStatus === 'succeeded' &&
    sortedPosts &&
    sortedPosts?.length > 0
  ) {
    postsList = sortedPosts.map((post) => (
      <SinglePost post={post} key={post.id} />
    ));
  } else if (postsStatus === 'failed') {
    postsList = <li>{error}</li>;
  }

  return (
    <section className="container">
      <h1 className={styles.title}>All Posts</h1>
      <Sorting />
      <ul className={styles.posts}>{postsList}</ul>
    </section>
  );
};

export default PostsFeed;
