import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styleSheets/SearchBar.css";
import api from "./Api";

const Searchbar = ({ setSearchResultsAuthors, setSearchResultsBooks }) => {
  const [searchbarInputAuthor, setSearchbarInputAuthor] = useState("");
  const [searchbarInputBook, setSearchbarInputBook] = useState("");

  const fetchBooks = async (value) => {
    try {
      const response = await api.get("/books");
      const json = response.data;

      const results = json.filter((books) => {
        return (
          books.book_name &&
          books.author_id &&
          books.book_name.toLowerCase().includes(value.toLowerCase())
        );
      });

      setSearchResultsBooks(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchAuthors = async (value) => {
    try {
      const response = await api.get("/authors");
      const json = response.data;

      const results = json.filter((authors) => {
        return (
          authors.author_name &&
          authors.author_id &&
          authors.author_name.toLowerCase().includes(value.toLowerCase())
        );
      });

      setSearchResultsAuthors(results);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChangeBook = (value) => {
    setSearchbarInputBook(value);
    fetchBooks(value);
  };

  const handleChangeAuthor = (value) => {
    setSearchbarInputAuthor(value);
    fetchAuthors(value);
  };

  return (
    <div className="input-wrapper">
      <FaSearch id="search-icon" />
      <input
        placeholder="Søk etter bok..."
        value={searchbarInputBook}
        onChange={(e) => handleChangeBook(e.target.value)}
      />
      <FaSearch id="search-icon" />
      <input
        placeholder="Søk etter forfatter..."
        value={searchbarInputAuthor}
        onChange={(e) => handleChangeAuthor(e.target.value)}
      />
    </div>
  );
};

export default Searchbar;