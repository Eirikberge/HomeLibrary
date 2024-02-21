import React from 'react';


const BooksFromAuthorList = ({ booksFromAuthor, getAuthorNameById }) => {
  return (
    <div>
      <h1>Books from: {booksFromAuthor.length > 0 ? getAuthorNameById(booksFromAuthor[0].author_id) : 'Unknown Author'}</h1>
      {booksFromAuthor.length > 0 ? (
        <ul>
          {booksFromAuthor.map((bookFromAuthor) => (
            <li key={bookFromAuthor.book_id}>
              <p>Tittel: {bookFromAuthor.book_name}</p>
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