import { useState } from "react";
import axios from "axios";

function AddAndDelete() {
  const [addBookBox, setShowAddBookBox] = useState(false);
  const [addAuthorBox, setShowAddAuthorBox] = useState(false);
  const [deleteBookBox, setShowDeleteBookBox] = useState(false);
  const [deleteAuthorBox, setShowDeleteAuthorBox] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookNameInput, setBookNameInput] = useState("");
  const [authorNameInput, setAuthorNameInput] = useState("");
  const [selectedBook, setSelctedBook] = useState("");
  const [selectedAuthor, setSelctedAuthor] = useState("");

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
  const addBook = async () => {
    setShowAddBookBox(false);
    setShowAddAuthorBox(false);
    try {
      await axios.post(`http://localhost:2222/addbooktodb/${selectedAuthor}/`, {
        bookName: bookNameInput,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const addAuthor = async () => {};
  const deleteBook = async () => {};
  const deleteAuthor = async () => {};

  const showAddBookBox = () => {
    clearWindows();
    fetchBooks();
    fetchAuthors();
    setShowAddBookBox(true);
  };
  const showAddAuthorBox = () => {
    clearWindows();
    fetchAuthors();
    setShowAddAuthorBox(true);
  };
  const showDeleteBookBox = () => {
    clearWindows();
    setShowDeleteBookBox(true);
  };
  const showDeleteAuthorBox = () => {
    clearWindows();
    setShowDeleteAuthorBox(true);
  };
  const handleBookChoice = (e) => {
    setSelctedBook(e.target.value);
  };
  const handleAuthorChoice = (e) => {
    setSelctedAuthor(e.target.value);
  };
  const handleInputBook = (e) => {
    setBookNameInput(e.target.value);
  };
  const handleInputAuthor = (e) => {
    setAuthorNameInput(e.target.value);
  };
  const clearSelected = () => {
    setSelctedBook('')
    setSelctedAuthor('')
  };
  const clearWindows = () => {
    clearSelected();
    setShowAddAuthorBox(false);
    setShowAddBookBox(false);
    setShowDeleteBookBox(false);
    setShowDeleteAuthorBox(false);
  };

  return (
    <div>
      <h1>Legg til bok eller forfatter</h1>
      <button onClick={() => showAddBookBox()}>Legg til bok</button>{" "}
      <button onClick={() => showAddAuthorBox()}>Legg til forfatter</button>{" "}
      <button onClick={() => showDeleteBookBox()}>Slett bok</button>{" "}
      <button onClick={() => showDeleteAuthorBox()}>Slett forfatter</button>
      {addBookBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Legg til bok:
          </h1>
          <label htmlFor="bookTitleInput">Boktittel: </label>
          <input
            type="text"
            id="bookTitleInput"
            value={bookNameInput}
            onChange={handleInputBook}
          />
          <br />
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={authorNameInput}
            onChange={handleAuthorChoice} // må se an når jeg kan velge forfattere.
          />
          <select
            id="authorChoice"
            value={selectedAuthor}
            onChange={handleAuthorChoice}
          >
            <option>Finn forfatter...</option>
            {authors.map((author) => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addBook()}>Lagre</button>
        </div>
      )}
      {addAuthorBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Legg til forfatter:
          </h1>
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={authorNameInput}
            onChange={handleInputAuthor}
          />

          <br />
          <br />

          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addAuthor()}>Lagre</button>
        </div>
      )}
      {deleteBookBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Slett bok:
          </h1>
          <label htmlFor="bookTitleInput">Bok: </label>
          <input
            type="text"
            id="bookTitleInput"
            value={bookNameInput}
            onChange={handleBookChoice}
          />
          <select
            id="bookChoice"
            value={selectedBook}
            onChange={handleBookChoice}
          >
            <option>Finn bok...</option>
            {books.map((book) => (
              <option key={book.book_id} value={book.book_id}>
                {book.book_name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => deleteBook()}>Lagre</button>
        </div>
      )}
      {deleteAuthorBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Slett forfatter:
          </h1>
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={authorNameInput}
            onChange={handleAuthorChoice}
          />
          <select
            id="authorChoice"
            value={selectedAuthor}
            onChange={handleAuthorChoice}
          >
            <option>Finn forfatter...</option>
            {authors.map((author) => (
              <option key={author.author_id} value={author.author_id}>
                {author.author_name}
              </option>
            ))}
          </select>

          <br />
          <br />

          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => deleteAuthor()}>Lagre</button>
        </div>
      )}
    </div>
  );
}

export default AddAndDelete;
