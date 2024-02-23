import React from "react";

const BooksList = ({ books }) => {

    // const skal jeg ha tilbakefunksjonen her?

    return (
    <div>
      <h1>Bøker</h1>
        <ul>
          {books.map((book) => (
            <li key={book.book_id}>
                {book.book_name}
            </li>
          ))}
        </ul>
        <button>Tilbake</button>
    </div>
  );
};

export default BooksList;
