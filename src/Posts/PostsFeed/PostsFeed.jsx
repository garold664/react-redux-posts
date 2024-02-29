import { useSelector } from 'react-redux';
import AddPostForm from '../AddPostForm/AddPostForm';
import { Link } from 'react-router-dom';
import PostAuthor from '../PostAuthor';
import TimeAgo from '../TimeAgo';
import ReactionButtons from '../ReactionButtons';

import styles from './PostsFeed.module.scss';
const PostsFeed = () => {
  const posts = useSelector((state) => state.posts);
  // console.log(posts);

  const orderedPosts = posts
    .slice()
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare
    .sort((a, b) => b.date.localeCompare(a.date));

  const renderedPosts = (
    <>
      <AddPostForm />
      <ul>
        {orderedPosts.map((post) => (
          <li key={post.id}>
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
