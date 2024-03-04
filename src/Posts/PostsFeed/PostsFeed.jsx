import { useSelector } from 'react-redux';
import AddPostForm from '../AddPostForm/AddPostForm';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons/ReactionButtons';

import styles from './PostsFeed.module.scss';
const PostsFeed = () => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = (
    <>
      <AddPostForm />
      <ul className={styles.posts}>
        {orderedPosts.map((post) => (
          <li key={post.id} className={styles.post}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <div>
              <PostAuthor userId={post.userId} />
              <TimeAgo timestamp={post.date} />
            </div>
            <ReactionButtons post={post} />
            <Link to={`/posts/${post.id}`}>link</Link>
          </li>
        ))}
      </ul>
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
