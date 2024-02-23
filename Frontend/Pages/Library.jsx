import React, { useEffect, useState } from "react";
import axios from "axios";
import BookList from "../src/components/booksList";

function Library() {
  const [showStartInterface, setStartinterface] = useState(true);
  const [books, setBooks] = useState([]);
  const [showBookList, setShowBookList] = useState(false);

  const showBooks = () => {
    setStartinterface(false);
    setShowBookList(true);
    fetchBooks();
  };

  const fetchBooks = async () => {
    try{
        const response = await axios.get("http://localhost:2222/books");
        setBooks(response.data);
    } catch (error) {
        console.error("Error fetching books:", error);
    }
  }

  return (
    <div>

      {showStartInterface && (
          <p>
            <h1>"Overskrift":</h1>
          <button onClick={showBooks}>Vis alle bøker</button>
          <button>Vis alle forfattere</button>
        </p>
      )}

        {showBookList && <BookList books={books} />}





    </div>
  );
}
export default Library;
