import { parseISO, formatDistanceToNow } from 'date-fns';

import styles from './TimeAgo.module.scss';
const TimeAgo = ({ timestamp }: { timestamp?: string }) => {
  let timeAgo = '';
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return (
    <span className={styles.timeAgo} title={timestamp}>
      &nbsp;<i>{timeAgo}</i>
    </span>
  );
};

export default TimeAgo;
