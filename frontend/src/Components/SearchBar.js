// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(searchTerm); // Pass the search term to the parent component or handle it here
  };

  return (
    <form
      className="d-flex justify-content-center my-4"
      onSubmit={handleSearch}
    >
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search for coffee"
          aria-label="Search for coffee"
          aria-describedby="button-addon2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
