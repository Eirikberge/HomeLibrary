import React, { useState } from "react";

const AuthorsListTEST = ({
  authors,
  fetchAllBooksFromAuthor,
  booksFromAuthor,
  getAuthorNameById,
}) => {
  const [showBooksFromAuthor, setShowBooksFromAuthor] = useState(false);

  const handleShowButton = (authorId) => {
    setShowBooksFromAuthor(true);
    fetchAllBooksFromAuthor(authorId);
  };
  const hideBooksFromAuthor = () => {
    setShowBooksFromAuthor(false);
  };

  return (
    <div>
      <h1>Forfattere</h1>
      {authors.length > 0 ? (
        <ul>
          {authors.map((author) => (
            <li key={author.author_id}>
              <h3>
                {author.author_name}{" "}
                <button onClick={() => handleShowButton(author.author_id)}>
                  Se bøker
                </button>
              </h3>
            </li>
          ))}
        </ul>
      ) : (
        <p>Laster forfattere</p>
      )}

      {showBooksFromAuthor && (
        <div>
          <h1>
            Bøker fra:{" "}
            {booksFromAuthor.length > 0
              ? getAuthorNameById(booksFromAuthor[0].author_id)
              : "Velg forfatter"}
          </h1>
          <ul>
            {booksFromAuthor.map((bookFromAuthor) => (
              <li key={bookFromAuthor.book_id}>
                <p>Tittel: {bookFromAuthor.book_name} </p>
              </li>
            ))}
          </ul>
          <button onClick={() => hideBooksFromAuthor()}>Tilbake</button>
        </div>
      )}
    </div>
  );
};

export default AuthorsListTEST;
