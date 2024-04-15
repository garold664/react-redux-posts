import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import type { Post } from '../../store/posts/postsSlice';
import styles from './Sorting.module.scss';
import queryString from 'query-string';
// import { useEffect, useState } from 'react';

type SortingLinkProps = {
  sortingKey: keyof Post;
};
function SortingLink({ sortingKey }: SortingLinkProps) {
  const location = useLocation();
  const navigate = useNavigate();
  let { sort: currentSortingKey, order } = queryString.parse(location.search);
  console.log(currentSortingKey);

  function handleSorting() {
    if (currentSortingKey === sortingKey || currentSortingKey === undefined) {
      order = order === 'asc' ? 'desc' : 'asc';
    }
    navigate(`/posts?sort=${sortingKey}&order=${order}`);
  }
  return (
    <button className={styles.link} onClick={handleSorting}>
      by {sortingKey}
      {order === 'asc' && sortingKey === currentSortingKey && (
        <CircleChevronDown />
      )}
      {order === 'desc' && sortingKey === currentSortingKey && (
        <CircleChevronUp />
      )}
    </button>
  );
}

export default function Sorting() {
  return (
    <section className={styles.container}>
      <SortingLink sortingKey="title" />
      <SortingLink sortingKey="date" />
      <SortingLink sortingKey="userId" />
    </section>
  );
}
