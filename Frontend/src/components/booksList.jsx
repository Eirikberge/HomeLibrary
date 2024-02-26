import React, { useState } from "react";
import SearchBar from "./searchbar";
const BooksList = ({ books, getAuthorNameById }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedBook, setSelectetBook] = useState(null);

  const moreInfo = (book) => {
    setSelectetBook(book);
    setShowInfoWindow(true);
  };
  const hideInfo = () => {
    setShowInfoWindow(false);
  };
  const changeInfo = () => {};

  return (
    <div>
      <div className="Searchbar">
        <div className="search-bar-container">
          <SearchBar />
        </div>
      </div>

      <ul className="listContainer">
        <h1>Bokhylle</h1>
        {books
          .sort((a, b) => a.book_name.localeCompare(b.book_name))
          .map((book) => (
            <li key={book.book_id} className="listItem">
              <div className="firstLine">Tittel: {book.book_name}</div>
              <div className="secondLine">
                Forfatter: {getAuthorNameById(book.author_id)}{" "}
              </div>
              <div className="thirdLine">
                {book.is_read ? "Lest✔" : "Ikke lest"}
                <button className="seeMorebtn" onClick={() => moreInfo(book)}>
                  Se mer
                </button>
              </div>
            </li>
          ))}
      </ul>
      {showInfoWindow && (
        <div className="infoWindow">
          <h2>Tittel: {selectedBook.book_name}</h2>
          <h3>Forfatter: {getAuthorNameById(selectedBook.author_id)}</h3>
          <p>Sammendrag: {selectedBook.book_summary}</p>
          <button onClick={() => hideInfo()}>Tilbake</button>
          <button onClick={() => changeInfo()}>Endre</button>
        </div>
      )}
    </div>
  );
};

export default BooksList;
