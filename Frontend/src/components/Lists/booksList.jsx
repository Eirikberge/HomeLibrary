import React from 'react';
import Checkbox from '../utilities/Checkbox';


const BooksList = ({ books, getAuthorNameById, changeIsRead }) => {
  const handleCheckboxChange = (bookId) => {
    changeIsRead(bookId);
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
                <Checkbox
                  label={book.is_read ? 'Lest' : 'Ikke lest'}
                  isRead={book.is_read}
                  onChange={() => handleCheckboxChange(book.book_id)}
                />
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