import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
// bootstrap
import "bootstrap/dist/css/bootstrap.css";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Home_follow from "./pages/Home_follow";
import Follow from "./pages/Follow";
import Create from "./pages/Create";
import Profile from "./pages/Profile";
import Post from "./pages/Post";
import EditProfile from "./pages/Edit_profile";
import SavedPost from "./pages/Saved_post";
import Preference from "./pages/Preference";

function App() {
  return (
    <Router>
      <div>
        {/* <nav className="d-flex justify-content-center">
          <ul className="list-unstyled d-flex">
            <li className="me-3">
              <Link to="/login">Login</Link>
            </li>
            <li className="me-3">
              <Link to="/register">Register</Link>
            </li>
            <li className="me-3">
              <Link to="/home">Home</Link>
            </li>
            <li className="me-3">
              <Link to="/home_follow">Home_follow</Link>
            </li>
            <li className="me-3">
              <Link to="/follow">follow</Link>
            </li>
            <li className="me-3">
              <Link to="/create">Create</Link>
            </li>
            <li className="me-3">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="me-3">
              <Link to="/post">Post</Link>
            </li>
            <li className="me-3">
              <Link to="/edit_profile">Edit_profile</Link>
            </li>
            <li className="me-3">
              <Link to="/saved_post">Saved_post</Link>
            </li>
            <li className="me-3">
              <Link to="/preference">Preference</Link>
            </li>
          </ul>
        </nav> */}

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
          <Route path="/home_follow" element={<Home_follow />} />
          <Route path="/follow" element={<Follow />} />
          <Route path="/create" element={<Create />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/edit_profile" element={<EditProfile />} />
          <Route path="/saved_post" element={<SavedPost />} />
          <Route path="/preference" element={<Preference />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
