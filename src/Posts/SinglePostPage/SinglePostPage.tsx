import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo';
import { fetchPosts, selectPostById } from '../../store/posts/postsSlice';

import type { RootState } from '../../store/store';
import { useEffect } from 'react';
import Spinner from '../../components/Spinner/Spinner';

import styles from './SinglePostPage.module.scss';

import avatar from '../../assets/img/default-avatar.webp';
const SinglePostPage = () => {
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
    <section className={styles.post}>
      <article className={styles.postContainer + ' container'}>
        <h2 className={styles.title}>{post.title}</h2>
        <div className={styles.info}>
          <img src={avatar} />
          <div className={styles.infoGroup}>
            <PostAuthor userId={post.userId} className={styles.author} />
            <TimeAgo timestamp={post.date} />
          </div>
        </div>
        {post.imageLink ? (
          <img className={styles.image} src={post.imageLink} alt="" />
        ) : (
          ''
        )}
        <p>{post.content}</p>

        <Link to={`/editPost/${post.id}`} className={styles.button}>
          Edit post
        </Link>
      </article>
    </section>
  );
};

export default SinglePostPage;
