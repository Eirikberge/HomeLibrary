import React from 'react';

const BooksList = ({ books, getAuthorNameById, changeIsRead }) => {
  const handleCheckboxChange = (bookId, change) => {
    changeIsRead(bookId, change);
  };

  return (
    <div>
      <h1>Books List:</h1>
      {books.length > 0 ? (
        <ul>
          {books.map((book) => (
            <li key={book.book_id}>
              <p>
                Tittel: {book.book_name} || Forfatter: {getAuthorNameById(book.author_id)}{' '}
                <label>
                  <input
                    type="checkbox"
                    checked={book.is_read}
                    onChange={() => handleCheckboxChange(book.book_id, book.is_read)}
                  />
                  {book.is_read ? 'Lest' : 'Ikke lest'}
                </label>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading books...</p>
      )}
    </div>
  );
};

export default BooksList;