import React, { useState } from "react";
import SearchbarBooks from "./SearchBarBooks";
import SearchbarAuthors from "./SearchbarAuthors";

const BooksList = ({ books, getAuthorNameById, changeIsRead, addSummary }) => {
  const [showInfoWindow, setShowInfoWindow] = useState(false);
  const [selectedBook, setSelectetBook] = useState(null);
  const [showSummary, setShowSummary] = useState(true);
  const [showTextboxSummary, setShowTextboxSummary] = useState(false);
  const [isBoxChecked, setIsBoxChecked] = useState(false);
  const [newSummaryText, setNewSummaryText] = useState("");
  const [saveBtn, setSaveBtn] = useState(false);

  const [searchResultsBooks, setSearchResultsBooks] = useState([]);
  const [searchResultsAuthors, setSearchResultsAuthors] = useState([]);

  const showMoreInfo = (book, bookSummary) => {
    setSelectetBook(book);
    setNewSummaryText(bookSummary);
    setShowInfoWindow(true);
    setIsBoxChecked(book.is_read);
    setSaveBtn(false);
  };
  const hideMoreInfo = () => {
    setShowInfoWindow(false);
    setShowSummary(true);
    setShowTextboxSummary(false);
  };
  const showTextboxWithSummary = () => {
    setSaveBtn(true);
    setShowSummary(false);
    setShowTextboxSummary(true);
  };
  const handleCheckboxChange = () => {
    // funker bare en gang, må endres!
    setIsBoxChecked(!isBoxChecked);
    setSaveBtn(true);
  };
  const saveNewInfo = (bookId, bookSummary) => {
    if (selectedBook.is_read !== isBoxChecked)
      changeIsRead(bookId, selectedBook.is_read);
    if (newSummaryText !== selectedBook.book_summary)
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
                    onClick={() => showMoreInfo(book, book.book_summary)}
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
            <button className="topRightButton" onClick={() => hideMoreInfo()}>
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
              {newSummaryText}
            </div>
          )}

          {showTextboxSummary && (
            <div>
              <textarea
                id="textInput"
                value={newSummaryText}
                onChange={(e) => setNewSummaryText(e.target.value)}
                rows={5}
                cols={50}
              />
            </div>
          )}
          <button onClick={() => hideMoreInfo()}>Tilbake</button>
          {saveBtn && (
            <button
              onClick={() => saveNewInfo(selectedBook.book_id, newSummaryText)}
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
