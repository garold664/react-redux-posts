import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './PostAuthor.module.scss';
import { RootState } from '../../store/store';

const PostAuthor = ({ userId }: { userId: string }) => {
  const author = useSelector((state: RootState) => {
    return state.users.find((user) => user.id == userId);
  });
  // console.log(author);

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
