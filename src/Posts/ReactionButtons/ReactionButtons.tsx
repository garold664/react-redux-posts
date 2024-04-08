import { Post, addReaction } from '../../store/posts/postsSlice';
import { useDispatch } from 'react-redux';

import styles from './ReactionButtons.module.scss';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '💝',
  rocket: '🚀',
  eyes: '👀',
  cat: '😻',
};

const ReactionButtons = ({ post }: { post: Post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className={styles.button}
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name as keyof typeof post.reactions]}
      </button>
    );
  });
  return <div className={styles.buttons}>{reactionButtons}</div>;
};

export default ReactionButtons;
