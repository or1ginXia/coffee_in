import React from "react";
import { useNavigate } from "react-router-dom";

const thumbnail = {
  height: "90px",
  width: "100%",
  overflow: "hidden",
};

const CoffeeCard = ({ postId, name, brand, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    navigate(`/post/${postId}`);
  };

  return (
    <div className="col-md-6 mb-4" onClick={handleClick}>
      <div className="card">
        <div style={thumbnail}>
          <img src={imageUrl} className="card-img-top img-fluid" alt={name} />
        </div>
        <div className="card-body">
          <h5 className="card-title">{name}</h5>
          <p className="card-text">{brand}</p>
        </div>
      </div>
    </div>
  );
};

export default CoffeeCard;
