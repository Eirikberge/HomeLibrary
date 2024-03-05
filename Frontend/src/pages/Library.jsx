import React, { useEffect, useState } from "react";
import api from "../components/api";
import BookList from "../components/LibraryBooksList";
import "../styleSheets/library.css";

function Library() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
  }, []);

  //#region API-calls
  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const getAuthorNameById = (authorid) => {
    const author = authors.find((a) => a.author_id === authorid);
    return author ? author.author_name : "Unknown Author";
  };

  const changeIsRead = async (bookId, isRead) => {
    try {
      const change = isRead ? 0 : 1;
      await api.patch(`/bookisread/${bookId}/${change}`);
      fetchBooks();
    } catch (error) {
      console.error("Error change read status:", error);
    }
  };

  const addSummary = async (bookId, bookSummary) => {
    try {
      await api.patch(`/summary/${bookId}/`, {
        text: bookSummary,
      });
      fetchBooks();
    } catch (error) {
      console.error("Error adding summary:", error);
    }
  };
  //#endregion
  return (
    <div>
      <BookList
        books={books}
        getAuthorNameById={getAuthorNameById}
        changeIsRead={changeIsRead}
        addSummary={addSummary}
      />
    </div>
  );
};
export default Library;
