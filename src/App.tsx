import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import MainContextProvider from './contexts/mainContext';

import './App.scss';
import styles from './App.module.scss';
import Posts from './Posts/PostsFeed/PostsFeed';
import { SinglePostPage } from './Posts/SinglePostPage';
import EditPostForm from './Posts/EditPostForm/EditPostForm';
import AddPostForm from './Posts/AddPostForm/AddPostForm';

function App() {
  return (
    <>
      <MainContextProvider>
        <nav className={styles.nav}>
          <div className="container">
            <NavLink className={styles.link} to="/">
              Home
            </NavLink>
            <NavLink className={styles.link} to="/newpost">
              Add a new Post
            </NavLink>
          </div>
        </nav>
        <main>
          <Routes>
            <Route index element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/newpost" element={<AddPostForm />} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<EditPostForm />} />
          </Routes>
        </main>
      </MainContextProvider>
    </>
  );
}

export default App;
