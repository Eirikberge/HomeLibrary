import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorsList from './components/Lists/authorsList';
import BooksList from './components/Lists/booksList';
import BooksFromAuthorList from './components/Lists/booksFromAuthorList';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksFromAuthor, setAllBooksFromAuthor] = useState([]);

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
    fetchAllBooksFromAuthor();
  }, []);

  const fetchAuthors = async () => {
    try {
      const response = await axios.get('http://localhost:2222/authors');
      setAuthors(response.data);
    } catch (error) {
      console.error('Error fetching authors:', error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:2222/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  const fetchAllBooksFromAuthor = async (authorId) => { // Denne funksjonen må løses slik at ikke authorId er undefiened første gang den kjøres.
    try {
      const response = await axios.get(`http://localhost:2222/books/${authorId}`);
      setAllBooksFromAuthor(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const getAuthorNameById = (authorid) => {
    const author = authors.find((a) => a.author_id === authorid);
    return author ? author.author_name : 'Unknown Author';
  };

  const changeIsRead = async (bookId) => {
    try {
      console.log(bookId)
      await axios.patch(`http://localhost:2222/booksread/${bookId}`);
      fetchBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div>

      <AuthorsList authors={authors} fetchAllBooksFromAuthor={fetchAllBooksFromAuthor} />
      
      <BooksList books={books} getAuthorNameById={getAuthorNameById} changeIsRead={changeIsRead} />

      <BooksFromAuthorList booksFromAuthor={booksFromAuthor} getAuthorNameById={getAuthorNameById} changeIsRead={changeIsRead} />
      
    </div>
  );
}

export default App;
