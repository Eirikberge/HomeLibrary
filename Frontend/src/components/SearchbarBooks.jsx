import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styleSheets/SearchBar.css";


const SearchbarBooks = ({setSearchResults}) => {
  const [searchbarInput, setSearchbarInput] = useState([]);

  const fetchData = (value) => {
    fetch("http://localhost:2222/books")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((book) => {
          return book.book_name && book.author_id && book.book_name.toLowerCase().includes(value.toLowerCase());
        });
        setSearchResults(results);
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
        placeholder="Søk etter bok..."
        value={searchbarInput}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchbarBooks;