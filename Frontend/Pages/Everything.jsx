import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorsListTEST from "../src/components/TESTauthorList";
import BooksListTEST from "../src/components/TESTbooksList";
import BooksFromAuthorListTEST from "../src/components/TESTbooksFromAuthorList";

function Everything() {

  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksFromAuthor, setAllBooksFromAuthor] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get("http://localhost:2222/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:2222/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };
  const fetchAllBooksFromAuthor = async (authorId) => {
    try {
      const response = await axios.get(
        `http://localhost:2222/books/${authorId}`
      );
      setAllBooksFromAuthor(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const getAuthorNameById = (authorid) => {
    const author = authors.find((a) => a.author_id === authorid);
    return author ? author.author_name : "Unknown Author";
  };

  const changeIsRead = async (bookId, isRead) => {
    try {
      const change = isRead ? 0 : 1;
      await axios.patch(`http://localhost:2222/bookisread/${bookId}/${change}`);
      fetchBooks();
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const addSummaryToDatabase = async (summaryText, bookId) => {
    try {
      await axios.patch(`http://localhost:2222/summary/${bookId}/`, {
        text: summaryText,
      });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div>
      <AuthorsListTEST
        authors={authors}
        fetchAllBooksFromAuthor={fetchAllBooksFromAuthor}
      />

      <BooksListTEST
        books={books}
        getAuthorNameById={getAuthorNameById}
        changeIsRead={changeIsRead}
        addSummaryToDatabase={addSummaryToDatabase}
      />

      <BooksFromAuthorListTEST
        booksFromAuthor={booksFromAuthor}
        getAuthorNameById={getAuthorNameById}
      />
    </div>
  );
}

export default Everything;
