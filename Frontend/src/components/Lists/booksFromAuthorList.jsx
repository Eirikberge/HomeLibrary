import React from 'react';
import Checkbox from '../utilities/Checkbox';

const BooksFromAuthorList = ({ booksFromAuthor, getAuthorNameById, changeIsRead }) => {
  const handleCheckboxChange = (bookId) => {
    changeIsRead(bookId);
  };

  return (
    <div>
      <h1>Books from: {booksFromAuthor.length > 0 ? getAuthorNameById(booksFromAuthor[0].author_id) : 'Unknown Author'}</h1>
      {booksFromAuthor.length > 0 ? (
        <ul>
          {booksFromAuthor.map((bookFromAuthor) => (
            <li key={bookFromAuthor.book_id}>
              <p>Tittel: {bookFromAuthor.book_name} 
              <Checkbox 
              label={bookFromAuthor.is_read ? "Lest" : "Ikke lest"} 
              isRead = {bookFromAuthor.is_read}  
              onChange={() => handleCheckboxChange(bookFromAuthor.book_id)}
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

export default BooksFromAuthorList;