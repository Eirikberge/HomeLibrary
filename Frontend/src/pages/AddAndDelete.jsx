import { useState, useEffect } from "react";
import axios from "axios";
import "../styleSheets/AddAndDelete.css";


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

  const [searchbarPressed, setSearchbarPressed] = useState(true)

  const [searchResultsBook, setSearchResultsBook] = useState([]);
  const [searchbarInput, setSearchbarInput] = useState([]);

  useEffect(() => {
    if (addBookBox || addAuthorBox || deleteBookBox || deleteAuthorBox) {
      fetchBooks();
      fetchAuthors();
    }
  }, [addBookBox, addAuthorBox, deleteBookBox, deleteAuthorBox]);

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
  const fetchBooksSB = (value) => {
    fetch("http://localhost:2222/books")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((books) => {
          return (
            books.book_name &&
            books.book_id &&
            books.book_name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchResultsBook(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  const addBook = async () => {
    clearWindows();
    try {
      await axios.post(`http://localhost:2222/addbooktodb/${selectedAuthor}/`, {
        bookName: bookNameInput,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
  };
  const addAuthor = async () => {};
  const deleteBook = async () => {
    clearWindows();
    try {
      await axios.delete(`http://localhost:2222/deletebook/${selectedBook}/`);
    } catch (error) {
      console.error("Error deleting book", error);
    }
    setSearchbarPressed(true);
    setSearchbarInput('')
  };
  const deleteAuthor = async () => {};

  const showAddBookBox = () => {
    clearWindows();
    setShowAddBookBox(true);
  };
  const showAddAuthorBox = () => {
    clearWindows();
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
    setSelctedBook("");
    setSelctedAuthor("");
  };
  const clearWindows = () => {
    clearSelected();
    setShowAddAuthorBox(false);
    setShowAddBookBox(false);
    setShowDeleteBookBox(false);
    setShowDeleteAuthorBox(false);
  };

  const handleSBChange = (value) => {
    setSearchbarInput(value);
    fetchBooksSB(value);
  };

  const handlesSearchBarClick = (id, name) => {
    setSelctedBook(id)
    setSearchbarInput(name)
    setSearchbarPressed(false)
  }

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
            placeholder="Skriv inn bok..."
            type="text"
            id="bookTitleInput"
            value={bookNameInput}
            onChange={handleInputBook}
          />

          <br />

          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            placeholder="Skriv inn forfatter..."
            type="text"
            id="authorNameInput"
            value={selectedAuthor}
            onChange={(e) => handleAuthorChoice(e.target.value)} // må se an når jeg kan velge forfattere.
            // onChange={(e) => handleChange(e.target.value)}
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
          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => addBook()}>Lagre</button>
          </div>
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
          <div className="addanddeleteBtns">
            <button className="topLeftButton" onClick={() => clearWindows()}>
              Tilbake
            </button>
            <button className="topLefttButton" onClick={() => addAuthor()}>
              Lagre
            </button>
          </div>
        </div>
      )}
      {deleteBookBox && (
        <div className="addingBox">
          <h1 style={{ display: "flex", justifyContent: "center" }}>
            Slett bok:
          </h1>
          <label htmlFor="bookChoiceSB">Bok: </label>
          <input
            type="text"
            id="bookChoiceSB"
            value={searchbarInput}
            onChange={(e) => handleSBChange(e.target.value)}
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

          <div className="searchResults">
            {searchbarInput !== "" && searchbarPressed &&
              searchResultsBook.map((result, id) => (
                <div  key={id} onClick={() => handlesSearchBarClick(result.book_id, result.book_name)}>{result.book_name}</div> // trykker på søkebarforslag
              ))}
          </div>

          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => deleteBook()}>Slett</button>
          </div>
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
          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => deleteAuthor()}>Slett</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddAndDelete;
