import React, { useState } from "react";
import SearchBar from "./searchbar";

const BooksList = ({ books, getAuthorNameById, changeIsRead }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedBook, setSelectetBook] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  const [showTextboxSummary, setShowTextboxSummary] = useState(false);
  const [inputText, setInputText] = useState("");
  const [isBoxChecked, setIsBokxChecked] = useState(false);
  const [newInputText, setNewInputText] = useState("");

  const moreInfo = (book, bookSummary) => {
    setSelectetBook(book);
    setInputText(bookSummary)
    setShowInfoWindow(true);
  };
  const hideInfo = () => {
    setShowInfoWindow(false);
    setShowSummary(true);
    setInputText('')
    setShowTextboxSummary(false);
    isBoxChecked(false);

  };
  const handleCheckboxChange = () => {
    isBoxChecked(true);
  };
  const showTextboxWithSummary = (bookSummary) => {
    setInputText(bookSummary);
    setShowSummary(false);
    setShowTextboxSummary(true);
  };
  const changeInfo = (bookId, isRead, bookSummary) => {
    if (isBoxChecked) changeIsRead(bookId, isRead);
    if (inputText =! newInputText) saveSummary(bookId, bookSummary);
  };

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
                <button className="seeMorebtn" onClick={() => moreInfo(book, book.book_summary)}>
                  Se mer
                </button>
              </div>
            </li>
          ))}
      </ul>

      {showInfoWindow && (
        <div className="infoWindow">
          <div className="infoHeadline">
            <h1>{selectedBook.book_name}</h1>
            <h2>Av: {getAuthorNameById(selectedBook.author_id)}</h2>
          </div>
          <label>
            <input
              type="checkbox"
              id={`checkbox_${selectedBook.book_id}`}
              checked={selectedBook.is_read}
              onChange={() =>
                handleCheckboxChange(selectedBook.book_id, selectedBook.is_read)
              }
            />
            {selectedBook.isRead ? "Lest" : "Ikke lest"}
          </label>

          <h4>Sammendrag:</h4>
          {showSummary && (
            <div
            className="summaryBox"
            onClick={() => showTextboxWithSummary(selectedBook.book_summary)}
            >
              {selectedBook.book_summary}
            </div>
          )}

          {showTextboxSummary && (
            <div>
              <textarea id="textInput" value={newInputText} onChange={(e) => setNewInputText(e.target.value)} rows={5} cols={50} />
            </div>
          )}

          <button onClick={() => hideInfo()}>Tilbake</button>
          <button
            onClick={() =>
              changeInfo(
                selectedBook.book_id,
                selectedBook.isRead,
                selectedBook.book_summary
              )
            }
          >
            Lagre
          </button>
        </div>
      )}
    </div>
  );
};

export default BooksList;
