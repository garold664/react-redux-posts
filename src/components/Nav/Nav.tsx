import { NavLink } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg';
import styles from './Nav.module.scss';

export default function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.navContainer + ' container'}>
        <NavLink
          end
          className={({ isActive }) =>
            `${styles.logo} ${isActive ? styles.active : ''}`
          }
          to="/posts"
        >
          <img src={logo} alt="" />
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `${styles.link} ${isActive ? styles.active : ''}`
          }
          to="/newpost"
        >
          Add a new Post
        </NavLink>
      </div>
    </nav>
  );
}
