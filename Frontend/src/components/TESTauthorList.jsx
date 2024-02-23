import React from "react";

const AuthorsListTEST = ({ authors, fetchAllBooksFromAuthor }) => {
  return (
    <div>
      <h1>Forfattere</h1>
      {authors.length > 0 ? (
        <ul>
          {authors.map((author) => (
            <li key={author.author_id}>
              <button onClick={() => fetchAllBooksFromAuthor(author.author_id)}>
                {author.author_name}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Laster forfattere</p>
      )}
    </div>
  );
};

export default AuthorsListTEST;
