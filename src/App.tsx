import { NavLink, Route, Routes, Navigate } from 'react-router-dom';
import MainContextProvider from './contexts/mainContext';

import './App.scss';
import styles from './App.module.scss';
import Posts from './Posts/PostsFeed/PostsFeed';
import SinglePostPage from './Posts/SinglePostPage/SinglePostPage';
import PostForm from './Posts/PostForm/PostForm';
import AddPostForm from './Posts/AddPostForm/AddPostForm';

import Nav from './components/Nav/Nav';

function App() {
  return (
    <>
      <MainContextProvider>
        <Nav />
        <main>
          <Routes>
            <Route index element={<Navigate to="/posts" />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/newpost" element={<PostForm />} />
            <Route path="/posts/:postId" element={<SinglePostPage />} />
            <Route path="/editPost/:postId" element={<PostForm />} />
          </Routes>
        </main>
      </MainContextProvider>
    </>
  );
}

export default App;
