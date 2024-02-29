import React from 'react';
import { addReaction } from '../store/posts/postsSlice';
import { useDispatch } from 'react-redux';

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '💝',
  rocket: '🚀',
  eyes: '👀',
  cat: '😻',
};

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
    return (
      <button
        key={name}
        type="button"
        className="muted-button reaction-button"
        onClick={() =>
          dispatch(addReaction({ postId: post.id, reaction: name }))
        }
      >
        {emoji} {post.reactions[name]}
      </button>
    );
  });
  return <div>{reactionButtons}</div>;
};

export default ReactionButtons;
