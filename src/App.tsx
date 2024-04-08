import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';

import './App.scss';
import styles from './App.module.scss';
import Posts from './Posts/PostsFeed/PostsFeed';
import { SinglePostPage } from './Posts/SinglePostPage';
import EditPostForm from './Posts/EditPostForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav className={styles.nav}>
          <div className="container">
            <NavLink className={styles.link} to="/">
              Home
            </NavLink>
            <NavLink className={styles.link} to="/posts">
              Posts
            </NavLink>
          </div>
        </nav>
        <main>
          <Routes>
            <Route path="/posts" element={<Posts />} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
