import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Pages
import Home from './components/home/HomePage';


import Register from './components/auth/Register';
import Dashboard from './components/home/Dashboard';
import UserProfile from './components/profile/ProfilePage';
import EditProfile from './components/profile/EditProfile';
import PostDetail from './components/post/PostPage';
import NewPost from './components/post/NewPost';
import GroupDetail from './components/group/GroupPage';
import NewGroup from './components/group/NewGroup';

// Components

function App() {
  return (
    <BrowserRouter>
      <div className="pages">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user/:userId" element={<UserProfile />} />
          <Route path="/user/:userId/edit" element={<EditProfile />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/post/new" element={<NewPost />} />
          <Route path="/group/:groupId" element={<GroupDetail />} />
          <Route path="/group/new" element={<NewGroup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
