import React, { useState } from "react";

const BooksListTEST = ({
  books,
  getAuthorNameById,
  changeIsRead,
  addSummaryToDatabase,
}) => {
  const [showSummaryTextbox, setShowSummaryTextbox] = useState(false);
  const [inputText, setInputText] = useState("");
  const [selectedBookId, setSelectedBookId] = useState(null);

  const handleCheckboxChange = (bookId, isRead) => {
    changeIsRead(bookId, isRead);
  };

  const getSummaryTextbox = (bookId, summaryText) => {
    setShowSummaryTextbox(true);
    setSelectedBookId(bookId);
    setInputText(summaryText);
  };

  const buttonAction = (action) => {
    if( action === "save"){
      addSummaryToDatabase(selectedBookId, inputText);
    } else if (action === "cancel"){
      setSelectedBookId(null);
    }
    setSelectedBookId(null);

  }

  return (
    <div>
      <h1>Bøker:</h1>
      <ul>
        {books.map((book) => (
          <li key={book.book_id}>
            <p>
              Tittel: {book.book_name} || Forfatter:{" "}
              {getAuthorNameById(book.author_id)}
              <label>
                <input
                  type="checkbox"
                  id={`checkbox_${book.book_id}`}
                  checked={book.is_read}
                  onChange={() =>
                    handleCheckboxChange(book.book_id, book.is_read)
                  }
                />
                {book.is_read ? "Lest " : "Ikke lest "}
              </label>
              <button
                onClick={() =>
                  getSummaryTextbox(book.book_id, book.book_summary)
                }
              >
                Legg til oppsumering
              </button>
            </p>
          </li>
        ))}
      </ul>
      {showSummaryTextbox && (
        <div>
          <label htmlFor="textInput">Skriv inn oppsummering:</label>
          <textarea
            id="textInput"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            rows={3}
            cols={50}
          />
          <button onClick={() => buttonAction("save")}>Lagre</button>
          <button onClick={() => buttonAction("cancel")}>Avbryt</button>
        </div>
      )}
    </div>
  );
};

export default BooksListTEST;
