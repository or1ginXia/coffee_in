import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import BottomMenu from "../Components/BottomMenu";
import ScaleInfo from "../Components/ScaleInfo";
import TextInfo from "../Components/TextInfo";

// Phone layout
const appStyle = {
  maxWidth: "393px",
  margin: "auto",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
  height: "852px",
  overflow: "hidden",
  borderRadius: "25px",
};

const creditFont = {
  fontSize: "12px",
};

const Post = () => {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [isHeartFilled, setIsHeartFilled] = useState(false);

  useEffect(() => {
    const fetchPostAndCheckSavedStatus = async () => {
      try {
        // Fetch post details
        const response = await fetch(`http://127.0.0.1:5000/post/${postId}`);
        if (response.ok) {
          const postData = await response.json();
          setPost(postData);
        } else {
          console.error("Error fetching post:", response.statusText);
        }

        // Check if the post is saved
        const userId = getSession(); // Ensure that getSession returns the correct user id
        if (userId) {
          const checkSavedResponse = await fetch(`http://127.0.0.1:5000/check_saved/${postId}/${userId}`, {
            method: 'GET', // Assuming a GET request
            headers: {
              'Content-Type': 'application/json',
              // Include authorization headers if needed
            },
          });
          if (checkSavedResponse.ok) {
            const savedData = await checkSavedResponse.json();
            setIsHeartFilled(savedData.isSaved);
          } else {
            console.error("Error checking saved status:", checkSavedResponse.statusText);
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPostAndCheckSavedStatus();
  }, [postId]);

  const getSession = () => {
    console.log("localStorage", localStorage);
    const sessionData = localStorage.getItem('session');
  
    if (sessionData) {
      const userData = JSON.parse(sessionData);
      return userData;
    }
  
    return null;
  };

  const toggleHeart = async () => {
    setIsHeartFilled(!isHeartFilled);
  
    const url = `http://127.0.0.1:5000/save_post`; // Replace with the correct URL
    const userid = getSession();
    const requestData = {
      userId: userid, // The current user's ID
      postId: postId, // The ID of the post being liked
      save: !isHeartFilled // Whether to save or unsave the post
    };
  
    try {
      const response = await fetch(url, {
        method: 'POST', // or 'PUT' depending on how you set it up
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Handle the response here
    } catch (error) {
      console.error('There has been a problem with your fetch operation:', error);
    }
  };

  const back = () => {
    window.history.go(-1);
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container d-flex flex-column" style={appStyle}>
      {/* Header Section */}
      <div className="my-3">
        <button className="btn">
          <i className="bi bi-arrow-left" onClick={back}></i> {/* Left arrow icon */}
        </button>
        <i className="bi bi-person-circle ms-2"></i>
        <span className="ms-2 fs-6">{post.username /* Adjust field as necessary */}</span>
        <span className="ms-2 text-danger" style={creditFont}>
          {"Credit: " + post.credit /* Adjust field as necessary */}
        </span>
      </div>

      {/* Coffee Image and Title */}
      <div className="mb-0">
        <img src={post.imageURI} alt={post.type} className="img-fluid border mb-1" />
        <div className="d-flex align-items-center justify-content-between">
          <h2>{post.type}</h2>
          <i
            className={`bi ${isHeartFilled ? "bi-heart-fill" : "bi-heart"} me-3 cursor-pointer`}
            onClick={toggleHeart}
          ></i>
        </div>
      </div>

      {/* Coffee Details */}
      <div className="mb-1 flex-grow-1 overflow-y-auto">
        {/* Example of rendering dynamic data, adjust according to your data structure */}
        <ScaleInfo label="Bitterness" max={10} value={post.bitterness} />
        <ScaleInfo label="Acidity" max={10} value={post.acidity} />
        <ScaleInfo label="Body" max={10} value={post.body} />
        <TextInfo field="Location" content={post.location} />
        <TextInfo field="Bean Origin" content={post.beanOrigin} />
        <TextInfo field="Bean Type" content={post.beanType} />
        <TextInfo field="Roast" content={post.roast} />
        <TextInfo field="Brewing" content={post.brewingMethod} />
        <TextInfo field="Details" content={post.details} />
      </div>

      {/* BottomMenu */}
      <BottomMenu />
    </div>
  );
};

export default Post;
