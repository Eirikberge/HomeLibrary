import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthorsList from './components/Lists/authorsList';
import BooksList from './components/Lists/booksList';
import BooksFromAuthorList from './components/Lists/booksFromAuthorList';
import SummaryTextBox from './components/Lists/summaryTextbox';

function App() {
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [booksFromAuthor, setAllBooksFromAuthor] = useState([]);
  const [showSummaryTextbox, setShowSummaryTextbox] = useState(false);
  const [ currentBookId, setCurrentBookId] = useState(0);

  useEffect(() => {
    fetchAuthors();
    fetchBooks();
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
  const fetchAllBooksFromAuthor = async (authorId) => {
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

  const changeIsRead = async (bookId, isRead) => {
    try {
      const change = isRead ? 0 : 1;
      await axios.patch(`http://localhost:2222/bookisread/${bookId}/${change}`);
      fetchBooks();
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addSummaryToDatabase = async(summaryText, bookId) => {
    try {
      await axios.patch(`http://localhost:2222/summary/${bookId}/`,{
        text:summaryText
      });
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const addSummaryTextbox = (bookId) => {
    setCurrentBookId(bookId)
    setShowSummaryTextbox(true)
  };
  const removeSummaryTextbox = () => {
    setShowSummaryTextbox(false)
  };


  return (
    <div>

      <AuthorsList authors={authors} fetchAllBooksFromAuthor={fetchAllBooksFromAuthor} />
      
      <BooksList books={books} getAuthorNameById={getAuthorNameById} changeIsRead={changeIsRead} addSummaryTextbox={addSummaryTextbox}/>

      <BooksFromAuthorList booksFromAuthor={booksFromAuthor} getAuthorNameById={getAuthorNameById}/>

      {showSummaryTextbox && <SummaryTextBox removeSummaryTextbox={removeSummaryTextbox} addSummaryToDatabase={addSummaryToDatabase} bookId={currentBookId}/>}
      
    </div>
  );
}

export default App;
