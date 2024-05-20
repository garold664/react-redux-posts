import { Link } from 'react-router-dom';

import PostAuthor from '../PostAuthor/PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

import type { Post } from '../../store/posts/postsSlice';

import styles from './SinglePost.module.scss';
const SinglePost = ({ post }: { post: Post }) => {
  return (
    <li key={post.id} className={styles.post}>
      <h2>{post.title}</h2>
      {post.imageLink ? (
        <img className={styles.image} src={post.imageLink} alt="" />
      ) : (
        ''
      )}
      <p>{post.content}</p>
      <div>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
      </div>
      <div className={styles.footer}>
        <ReactionButtons post={post} />
        <Link className={styles.readLink} to={`/posts/${post.id}`}>
          read the post
        </Link>
      </div>
    </li>
  );
};

export default SinglePost;
