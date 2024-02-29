import { useState } from "react";
import axios from "axios";

function AddAndDelete() {
  const [addBookBox, setShowAddBookBox] = useState(false);
  const [addAuthorBox, setShowAddAuthorBox] = useState(false);
  const [deleteBookBox, setShowDeleteBookBox] = useState(false);
  const [deleteAuthorBox, setShowDeleteAuthorBox] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookTitleInput, setInputValue] = useState("");
  const [authorNameInput, setInputValueAuthor] = useState("");
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
  const addBookToDB = async () => {
    setShowAddBookBox(false);
    setShowAddAuthorBox(false);
    try {
      await axios.post(`http://localhost:2222/addbooktodb/${selectedAuthor}/`, {
        bookTitle: bookTitleInput,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

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
  const showDeleteBook = () => {
    clearWindows();
    setShowDeleteBookBox(true);
  };
  const showDeleteAuthor = () => {
    clearWindows();
    setShowDeleteAuthorBox(true);
  };
  const handleAuthorChoice = (e) => {
    setSelctedAuthor(e.target.value);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputChangeAuthor = (e) => {
    setInputValueAuthor(e.target.value);
  };
  const handleInputChangeDeleteBook = (e) => {
    setInputValueAuthor(e.target.value);
  };
  const handleInputChangeDeleteAuthor = (e) => {
    setInputValueAuthor(e.target.value);
  };
  const clearWindows = () => {
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
      <button onClick={() => showDeleteBook()}>Slett bok</button>{" "}
      <button onClick={() => showDeleteAuthor()}>Slett forfatter</button>
      {addBookBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Legg til bok:
          </h1>
          <label htmlFor="bookTitleInput">Boktittel: </label>
          <input
            type="text"
            id="bookTitleInput"
            value={bookTitleInput}
            onChange={handleInputChange}
          />
          <br />
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={authorNameInput}
            onChange={handleInputChangeDeleteAuthor}
          />

          <div>
            <label htmlFor="authorChoice">Velg forfatter:</label>
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
          </div>

          <br />
          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addBookToDB()}>Lagre</button>
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
            onChange={handleInputChangeAuthor}
          />
          <br />
          <br />
          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addBookToDB()}>Lagre</button>
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
            value={bookTitleInput}
            onChange={handleInputChangeDeleteBook}
          />
          <br />
          <br />
          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addBookToDB()}>Lagre</button>
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
            onChange={handleInputChangeDeleteAuthor}
          />
          <br />
          <br />
          <button onClick={() => clearWindows()}>Tilbake</button>
          <button onClick={() => addBookToDB()}>Lagre</button>
        </div>
      )}
    </div>
  );
}

export default AddAndDelete;
