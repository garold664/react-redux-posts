import styles from './ErrorMsg.module.scss';
import { X } from 'lucide-react';

export default function ErrorMsg({
  errorText,
  closeError,
}: {
  errorText: string;
  closeError: () => void;
}) {
  return (
    <div className={styles.error}>
      Something went wrong: {errorText ? errorText : 'Error'}{' '}
      <button className={styles.closeBtn} onClick={(event) => closeError()}>
        <X className={styles.icon} />
      </button>
    </div>
  );
}
