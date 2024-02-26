import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../src/components/booksList";

function Library() {
  const [showStartInterface, setStartinterface] = useState(true);
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [showBookList, setShowBookList] = useState(false);

  const showBooks = () => {
    setStartinterface(false);
    setShowBookList(true);
    fetchBooks();
    fetchAuthors();
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:2222/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:2222/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const getAuthorNameById = (authorid) => {
    const author = authors.find((a) => a.author_id === authorid);
    return author ? author.author_name : "Unknown Author";
  };

  return (
    <div>
      {showStartInterface && (
        <div>
          <h2>"Overskrift":</h2>
          <p>
            <button onClick={showBooks}>Vis alle bøker</button>{" "}
            <button>Vis alle forfattere</button>
          </p>
        </div>
      )}

      {showBookList && (
        <BookList books={books} getAuthorNameById={getAuthorNameById} />
      )}
    </div>
  );
}
export default Library;
