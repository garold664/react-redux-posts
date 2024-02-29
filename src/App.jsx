import { BrowserRouter, Link, NavLink, Route, Routes } from 'react-router-dom';

// import './App.scss';
import styles from './App.module.scss';
import Posts from './Posts/PostsFeed';
import { SinglePostPage } from './Posts/SinglePostPage';
import EditPostForm from './Posts/EditPostForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <NavLink to="/posts">Posts</NavLink>
        </nav>
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<SinglePostPage />} />
          <Route path="/editPost/:postId" element={<EditPostForm />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
