import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PostAuthor.module.scss';

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => {
    return state.users.find((user) => user.id == userId);
  });
  console.log(author);

  return (
    <span>
      by{' '}
      <Link to="/" className={styles.link}>
        {author ? author.name : 'Unknown author'}
      </Link>
    </span>
  );
};

export default PostAuthor;
