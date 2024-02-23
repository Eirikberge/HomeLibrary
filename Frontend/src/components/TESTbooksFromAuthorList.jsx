import React from "react";

const BooksFromAuthorListTEST = ({ booksFromAuthor, getAuthorNameById }) => {
  return (
    <div>
      <h1>
        Bøker fra:{" "}
        {booksFromAuthor.length > 0
          ? getAuthorNameById(booksFromAuthor[0].author_id)
          : "Velg forfatter"}
      </h1>
      {booksFromAuthor.length > 0 ? (
        <ul>
          {booksFromAuthor.map((bookFromAuthor) => (
            <li key={bookFromAuthor.book_id}>
              <p>
                Tittel: {bookFromAuthor.book_name}{" "}
                {bookFromAuthor.book_summary === ""
                  ? ""
                  : ` || Oppsummering: ${bookFromAuthor.book_summary}`}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default BooksFromAuthorListTEST;
