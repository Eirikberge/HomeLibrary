import React, { useState } from "react";
import SearchbarBooks from "./SearchBarBooks";
import SearchbarAuthors from "./SearchbarAuthors";

const BooksList = ({ books, getAuthorNameById, changeIsRead, addSummary }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedBook, setSelectetBook] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  const [showTextboxSummary, setShowTextboxSummary] = useState(false);
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [newInputText, setNewInputText] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);

  const [searchResultsBooks, setSearchResultsBooks] = useState([]);
  const [searchResultsAuthors, setSearchResultsAuthors] = useState([]);

  const moreInfo = (book, bookSummary) => {
    setSelectetBook(book);
    setNewInputText(bookSummary);
    setShowInfoWindow(true);
    setIsBoxChecked(book.is_read);
    setSaveBtn(false);
  };
  const hideInfo = () => {
    setShowInfoWindow(false);
    setShowSummary(true);
    setShowTextboxSummary(false);
  };
  const handleCheckboxChange = () => {
    // funker bare en gang, må endres!
    setIsBoxChecked(!isBoxChecked);
    setSaveBtn(true);
  };
  const showTextboxWithSummary = () => {
    setSaveBtn(true);
    setShowSummary(false);
    setShowTextboxSummary(true);
  };
  const changeInfo = (bookId, bookSummary) => {
    if (selectedBook.is_read !== isBoxChecked)
      changeIsRead(bookId, selectedBook.is_read);
    if (newInputText !== selectedBook.book_summary)
      addSummary(bookId, bookSummary);
    setShowTextboxSummary(false);
    setShowSummary(true);
    setSaveBtn(false);
  };

  return (
    <div>
      <h1>Bokhylle</h1>
      <div className="search-bar-container">
        <SearchbarBooks setSearchResultsBooks={setSearchResultsBooks} />
        <SearchbarAuthors setSearchResultsAuthors={setSearchResultsAuthors} />
      </div>
      <ul className="listContainer">
        <div className="scroll-container">
          {books
            .filter(
              (book) =>
                (searchResultsBooks.length === 0 ||
                  searchResultsBooks.some(
                    (result) => result.book_name === book.book_name
                  )) &&
                (searchResultsAuthors.length === 0 ||
                  searchResultsAuthors.some(
                    (author) => author.author_id === book.author_id
                  ))
            )
            .sort((a, b) => a.book_name.localeCompare(b.book_name))
            .map((book) => (
              <li key={book.book_id} className="listItem">
                <div className="firstLine">Tittel: {book.book_name}</div>
                <div className="secondLine">
                  Forfatter: {getAuthorNameById(book.author_id)}{" "}
                </div>
                <div className="thirdLine">
                  {book.is_read ? "Lest✔" : "Ikke lest"}
                  <button
                    className="seeMorebtn"
                    onClick={() => moreInfo(book, book.book_summary)}
                  >
                    Se mer
                  </button>
                </div>
              </li>
            ))}
        </div>
      </ul>

      {showInfoWindow && (
        <div className="infoWindow">
          <div className="infoHeadline">
            <h1>{selectedBook.book_name}</h1>
            <h2>Av: {getAuthorNameById(selectedBook.author_id)}</h2>
          </div>
          <div className="topRightButtonContainer">
            <button className="topRightButton" onClick={() => hideInfo()}>
              X
            </button>
          </div>
          <label>
            <input
              type="checkbox"
              id={`checkbox_${selectedBook.book_id}`}
              checked={isBoxChecked}
              onChange={() =>
                handleCheckboxChange(selectedBook.book_id, selectedBook.is_read)
              }
            />
            {isBoxChecked ? "Lest" : "Ikke lest"}
          </label>

          <h4>Sammendrag:</h4>
          {showSummary && (
            <div
              className="summaryBox"
              onClick={() => showTextboxWithSummary(selectedBook.book_summary)}
            >
              {newInputText}
            </div>
          )}

          {showTextboxSummary && (
            <div>
              <textarea
                id="textInput"
                value={newInputText}
                onChange={(e) => setNewInputText(e.target.value)}
                rows={5}
                cols={50}
              />
            </div>
          )}
          <button onClick={() => hideInfo()}>Tilbake</button>
          {saveBtn && (
            <button
              onClick={() => changeInfo(selectedBook.book_id, newInputText)}
            >
              Lagre
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default BooksList;
