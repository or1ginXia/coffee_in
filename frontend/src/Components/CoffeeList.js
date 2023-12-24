import React, { useState, useEffect } from "react";
import CoffeeCard from "./CoffeeCard";

const getSession = () => {
  const sessionData = localStorage.getItem('session');

  if (sessionData) {
    const userData = JSON.parse(sessionData);
    return userData;
  }

  return null;
};

function CoffeeList({ postType }) {
  const [coffeeItems, setCoffeeItems] = useState([]);

  useEffect(() => {
    const fetchCoffeeItems = async () => {
      let url;
      const userid = getSession();
      switch (postType) {
        case "followed":
          url = "http://127.0.0.1:5000/followed-coffee-posts/" + userid;
          break;
        case "saved":
          url = "http://127.0.0.1:5000/saved-coffee-posts/" + userid;
          break;
        case "profile":
          url = "http://127.0.0.1:5000/my-coffee-posts/" + userid;
          break;
        default:
          url = "http://127.0.0.1:5000/coffee-posts";
      }
      try {
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCoffeeItems(data);
        } else {
          // Handle response errors
          console.error("Failed to fetch coffee items");
        }
      } catch (error) {
        // Handle network errors
        console.error("Network error:", error);
      }
    };

    fetchCoffeeItems();
  }, []);

  return (
    <div className="flex-grow-1">
      <div className="row">
        {coffeeItems.map((item, index) => (
          <CoffeeCard
            key={index}
            postId={item.id}
            name={item.name}
            brand={item.brand}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    </div>
  );
}

export default CoffeeList;
