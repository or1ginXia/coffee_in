// BottomMenu.js
import React from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useNavigate } from "react-router-dom";

const menuFont = {
  fontSize: "10px",
};

const BottomMenu = () => {
  const navigate = useNavigate();

  const handleHome = (e) => {
    e.preventDefault();
    navigate("/home"); // This will navigate to the HomePage component
  };

  const handleLike = (e) => {
    e.preventDefault();
    navigate("/home_follow"); // This will navigate to the HomePage component
  };

  const handleCreate = (e) => {
    e.preventDefault();
    navigate("/create"); // This will navigate to the HomePage component
  };

  const handleFollow = (e) => {
    e.preventDefault();
    navigate("/saved_post"); // This will navigate to the HomePage component
  };

  const handleProfile = (e) => {
    e.preventDefault();
    navigate("/profile"); // This will navigate to the HomePage component
  };

  return (
    <>
      <hr className="m-0" />
      <nav className="navbar navbar-light">
        <div className="container-fluid justify-content-around">
          <a
            href="/"
            className="nav-link d-flex flex-column align-items-center"
            title="Home"
            onClick={handleHome}
          >
            <i className="bi bi-house-door-fill"></i>
            <div style={menuFont}>Home</div>
          </a>
          <a
            href="/favorites"
            className="nav-link d-flex flex-column align-items-center"
            title="Favorites"
            onClick={handleLike}
          >
            <i className="bi bi-heart-fill"></i>
            <div style={menuFont}>Followed</div>
          </a>
          <a
            href="/add"
            className="nav-link d-flex flex-column align-items-center"
            title="Add Post"
            onClick={handleCreate}
          >
            <i className="bi bi-plus-square-fill"></i>
            <div style={menuFont}>Create</div>
          </a>
          <a
            href="/discover"
            className="nav-link d-flex flex-column align-items-center"
            title="Discover"
            onClick={handleFollow}
          >
            <i className="bi bi-bookmark-fill"></i>
            <div style={menuFont}>Saved</div>
          </a>
          <a
            href="/profile"
            className="nav-link d-flex flex-column align-items-center"
            title="Profile"
            onClick={handleProfile}
          >
            <i className="bi bi-person-fill"></i>
            <div style={menuFont}>Me</div>
          </a>
        </div>
      </nav>
    </>
  );
};

export default BottomMenu;
