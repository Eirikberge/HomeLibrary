import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styleSheets/SearchBar.css";


const SearchbarAuthors = ({setSearchResultsAuthors}) => {
  const [searchbarInput, setSearchbarInput] = useState([]);

  const fetchData = (value) => {
    fetch("http://localhost:2222/authors")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((author) => {
          return author.author_name && author.author_id && author.author_name.toLowerCase().includes(value.toLowerCase());
        });
        setSearchResultsAuthors(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleChange = (value) => {
    setSearchbarInput(value);
    fetchData(value);
  };
  
  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Søk etter forfatter..."
        value={searchbarInput}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchbarAuthors;
