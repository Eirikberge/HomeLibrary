import { useState } from "react";
import axios from "axios";

function MyPage() {
  const [addBookBox, setShowAddBookBox] = useState(false);
  const [addAuthorBox, setShowAddAuthorBox] = useState(false);
  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);
  const [bookTitleInput, setInputValue] = useState("");
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

  const handleAuthorChoice = (e) => {
    setSelctedAuthor(e.target.value);
  };

  const showAddBookBox = () => {
    setShowAddAuthorBox(false);
    fetchBooks();
    fetchAuthors();
    setShowAddBookBox(true);
  };
  const showAddAuthorBox = () => {
    setShowAddBookBox(false);
    fetchAuthors();
    setShowAddAuthorBox(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const addBookToDB = async () => {
    setShowAddBookBox(false);
    setShowAddAuthorBox(false);
    try {
      await axios.post(`http://localhost:2222/addbooktodb/${selectedAuthor}/`,{
            bookTitle: bookTitleInput,
        });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };

  return (
    <div>
      <h1>Legg til bok eller forfatter</h1>
      <button onClick={() => showAddBookBox()}>Legg til bok</button>
      <button onClick={() => showAddAuthorBox()}>Legg til forfatter</button>
      {addBookBox && (
        <div className="addBookBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Legg til Bok:
          </h1>
          <label htmlFor="bookTitleInput">Boktittel: </label>
          <input
            type="text"
            id="bookTitleInput"
            value={bookTitleInput}
            onChange={handleInputChange}
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
          <button onClick={() => addBookToDB()}>Lagre</button>
        </div>
      )}
      {addAuthorBox && <div className="addAuthorBox"></div>}
    </div>
  );
}

export default MyPage;
