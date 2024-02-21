import React from 'react';

const AuthorsList = ({ authors, fetchAllBooksFromAuthor }) => {
  return (
    <div>
      <h1>Authors List:</h1>
      {authors.length > 0 ? (
        <ul>
          {authors.map((author) => (
            <li key={author.author_id}>
              <button onClick={() => fetchAllBooksFromAuthor(author.author_id)}>{author.author_name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading authors...</p>
      )}
    </div>
  );
};

export default AuthorsList;