import { CircleChevronDown, CircleChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Post } from '../../store/posts/postsSlice';
import styles from './Sorting.module.scss';
import { useEffect, useState } from 'react';

function SortingLink({
  sortingKey,
  setOrder,
  order,
  currentSortingKey,
}: {
  sortingKey: keyof Post;
  setOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  order: 'asc' | 'desc';
  currentSortingKey: keyof Post;
}) {
  function handleSorting() {
    setOrder((order) => (order === 'asc' ? 'desc' : 'asc'));
  }
  return (
    <Link
      className={styles.link}
      onClick={handleSorting}
      to={`/posts?sort=${sortingKey}&order=${order}`}
    >
      by {sortingKey}
      {order === 'asc' && sortingKey === currentSortingKey && (
        <CircleChevronDown />
      )}
      {order === 'desc' && sortingKey === currentSortingKey && (
        <CircleChevronUp />
      )}
    </Link>
  );
}

export default function Sorting({
  setOrder,
  order,
  currentKey,
}: {
  setOrder: React.Dispatch<React.SetStateAction<'asc' | 'desc'>>;
  order: 'asc' | 'desc';
  currentKey: keyof Post;
}) {
  return (
    <section className={styles.container}>
      <SortingLink
        sortingKey="title"
        setOrder={setOrder}
        order={order}
        currentSortingKey={currentKey}
      />
      <SortingLink
        sortingKey="date"
        setOrder={setOrder}
        order={order}
        currentSortingKey={currentKey}
      />
      <SortingLink
        sortingKey="userId"
        setOrder={setOrder}
        order={order}
        currentSortingKey={currentKey}
      />
    </section>
  );
}
