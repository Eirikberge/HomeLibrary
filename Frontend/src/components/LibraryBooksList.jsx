import React, { useState } from "react";
import Searchbar from "./searchbar";

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

  const [selectedIsRead, setSelectedIsRead] = useState("All");

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
    setIsBoxChecked(!isBoxChecked);
    setSaveBtn(true);
  };
  const handleIsReadBooks = (e) => {
    setSelectedIsRead(e.target.value);
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
      <div className="header-bokhylle">
        <h1>Bokhylle</h1>
      </div>
      <div className="search-bar-container">
        <Searchbar
          setSearchResultsBooks={setSearchResultsBooks}
          setSearchResultsAuthors={setSearchResultsAuthors}
        />

        <div className="drop-down-container">
          <select
            id="isReadChoice"
            value={selectedIsRead}
            onChange={handleIsReadBooks}
          >
            <option value={"All"}>Alle</option>
            <option value={"justRead"}>Lest</option>
            <option value={"justNotRead"}>Ikke lest</option>
          </select>
        </div>
      </div>

      <ul className="listContainer">
        <div className="scroll-container">
          {books
            .filter(
              (book) =>
                ((searchResultsBooks.length === 0 &&
                  (selectedIsRead === "All" ||
                    (selectedIsRead === "justRead" && book.is_read) ||
                    (selectedIsRead === "justNotRead" && !book.is_read))) ||
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
              <div key={book.book_id} className="listItem">
                <div className="img-container">no img</div>
                <div className="content">
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
                </div>
              </div>
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
              onClick={() => showTextboxWithSummary(selectedBook.book_summary)} // se på useRef
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
          <div className="bottomLeftButtonContainer">
            <button className="bottomLeftButton" onClick={() => hideMoreInfo()}>
              Tilbake
            </button>{" "}
            {saveBtn && (
              <button
                className="bottomLeftButton"
                onClick={() =>
                  saveNewInfo(selectedBook.book_id, newSummaryText)
                }
              >
                Lagre
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default BooksList;
