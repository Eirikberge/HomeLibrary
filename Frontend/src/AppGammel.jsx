import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthorsList from "./components/authorsList";
import BooksList from "./components/booksList";
import BooksFromAuthorList from "./components/booksFromAuthorList";
import Navbar from "./Navbar";
import MyPage from "./MyPage";
import Home  from "./Home";

function App() {
  let selectedSite
  switch (window.location.pathname){
    case "/":
      selectedSite = <Home />
      break
    case "/myPage":
      selectedSite = <MyPage />
      break
  }

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
      <Navbar/> 
      <div className="selectedSideInfo">{selectedSite}</div>

      <AuthorsList
        authors={authors}
        fetchAllBooksFromAuthor={fetchAllBooksFromAuthor}
      />

      <BooksList
        books={books}
        getAuthorNameById={getAuthorNameById}
        changeIsRead={changeIsRead}
        addSummaryToDatabase={addSummaryToDatabase}
      />

      <BooksFromAuthorList
        booksFromAuthor={booksFromAuthor}
        getAuthorNameById={getAuthorNameById}
      />
    </div>
  );
}

export default App;
