import { useState, useEffect } from "react";
import api from "../components/Api";
import "../styleSheets/AddAndDelete.css";

function AddAndDelete() {
  const [showBox, setShowBox] = useState("");

  const [authors, setAuthors] = useState([]);
  const [books, setBooks] = useState([]);

  const [bookNameInput, setBookNameInput] = useState("");
  const [authorNameInput, setAuthorNameInput] = useState("");

  const [selectedBook, setSelctedBook] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState("");

  const [searchbarPressed, setSearchbarPressed] = useState(true);

  const [searchResultsBook, setSearchResultsBooks] = useState([]);
  const [searchResultsAuthors, setSearchResultsAuthors] = useState([]);
  const [searchbarInput, setSearchbarInput] = useState([]);

  const [actionText, setActionText] = useState("");

  useEffect(() => {
    if (showBox) {
      fetchBooks();
      fetchAuthors();
    }
  }, [showBox]);

  useEffect(() => {
    if (actionText) {
      const timerId = setTimeout(() => {
        setActionText("");
      }, 5000);
      return () => clearTimeout(timerId);
    }
  }, [actionText]);

  const fetchBooks = async (value) => {
    try {
      const response = await api.get("/books");
      const booksData = response.data;
      setBooks(booksData);
      if (value) {
        const results = booksData.filter((book) => {
          const { book_name, author_id } = book;
          return (
            book_name &&
            author_id &&
            book_name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchResultsBooks(results);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const fetchAuthors = async (value) => {
    try {
      const response = await api.get("/authors");
      const authorData = response.data;
      setAuthors(authorData);
      if (value) {
        const results = authorData.filter((author) => {
          const { author_name, author_id } = author;
          return (
            author_name &&
            author_id &&
            author_name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchResultsAuthors(results);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addData = async (endpoint, inputData, successText) => {
    try {
      await api.post(endpoint, inputData);
      setActionText(successText);
    } catch (error) {
      console.error("Error adding data:", error);
    }
    clearWindows();
  };

  const deleteData = async (endpoint, id, successText) => {
    try {
      await api.delete(`${endpoint}/${id}`);
      setActionText(successText);
    } catch (error) {
      console.error("Error deleting data:", error);
    }
    clearWindows();
  };

  const addBook = () => addData(`/addbooktodb/${selectedAuthor}/`, { bookName: bookNameInput }, `Boken ${bookNameInput} lagt til`);

  const addAuthor = () => addData("/addauthor/", { authorName: authorNameInput }, `Forfatter ${authorNameInput} lagt til`);
  
  const deleteBook = () => deleteData("/deletebook", selectedBook, `Boken ${selectedBook} er slettet`);
  
  const deleteAuthor = () => deleteData("/deleteauthor", selectedAuthor, `Forfatter ${selectedAuthor} er slettet`);

  const handleAuthorChoice = (e) => setSelectedAuthor(e.target.value);
  const handleInputBook = (e) => setBookNameInput(e.target.value);
  const handleInputAuthor = (e) => setAuthorNameInput(e.target.value);

  const handleSearchbarBook = (value) => {
    setSearchbarInput(value);
    fetchBooks(value);
  };
  const handleSearchbarAuthor = (value) => {
    setSearchbarInput(value);
    fetchAuthors(value);
  };
  const handlesSearchBarClickBook = (id, name) => {
    setSelctedBook(id);
    setSearchbarInput(name);
    setSearchbarPressed(false);
  };
  const handleSearchBarClickAuthor = (id, name) => {
    setSelectedAuthor(id);
    setSearchbarInput(name);
    setSearchbarPressed(false);
  };

  const updateBox = (state) => {
    clearWindows();
    setShowBox(state);
  };

  const clearWindows = () => {
    setShowBox("");
    setSearchbarPressed(true);
    setSearchbarInput("");
    setBookNameInput("");
    setSelctedBook("");
    setSelectedAuthor("");
    setAuthorNameInput("");
  };

  return (
    <div>
      <h1>Legg til bok eller forfatter</h1>
      <section>
        <button onClick={() => updateBox("addBook")}>Legg til bok</button>{" "}
        <button onClick={() => updateBox("addAuthor")}>
          Legg til forfatter
        </button>{" "}
        <button onClick={() => updateBox("deleteBook")}>Slett bok</button>{" "}
        <button onClick={() => updateBox("deleteAuthor")}>
          Slett forfatter
        </button>
      </section>
      {actionText}
      {showBox === "addBook" && (
        <section className="addingBox">
          <h1>Legg til bok:</h1>
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
            value={searchbarInput}
            onChange={(e) => handleSearchbarAuthor(e.target.value)}
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

          <div className="searchResults">
            {searchbarInput !== "" &&
              searchbarPressed &&
              searchResultsAuthors.map((result, id) => (
                <div
                  key={id}
                  onClick={() =>
                    handleSearchBarClickAuthor(
                      result.author_id,
                      result.author_name
                    )
                  }
                >
                  {result.author_name}
                </div>
              ))}
          </div>

          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => addBook()}>Lagre</button>
          </div>
        </section>
      )}
      {showBox === "addAuthor" && (
        <div className="addingBox">
          <h1>Legg til forfatter:</h1>
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={authorNameInput}
            onChange={handleInputAuthor}
          />
          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => addAuthor()}>Lagre</button>
          </div>
        </div>
      )}
      {showBox === "deleteBook" && (
        <div className="addingBox">
          <h1>Slett bok:</h1>
          <label htmlFor="bookChoiceSB">Boktittel: </label>
          <input
            type="text"
            id="bookChoiceSB"
            value={searchbarInput}
            onChange={(e) => handleSearchbarBook(e.target.value)}
          />
          <div className="searchResults">
            {searchbarInput !== "" &&
              searchbarPressed &&
              searchResultsBook.map((result, id) => (
                <div
                  key={id}
                  onClick={() =>
                    handlesSearchBarClickBook(result.book_id, result.book_name)
                  }
                >
                  {result.book_name}
                </div>
              ))}
          </div>

          <div className="addanddeleteBtns">
            <button onClick={() => clearWindows()}>Tilbake</button>
            <button onClick={() => deleteBook()}>Slett</button>
          </div>
        </div>
      )}
      {showBox === "deleteAuthor" && (
        <div className="addingBox">
          <h1>Slett forfatter:</h1>
          <label htmlFor="authorNameInput">Forfatter: </label>
          <input
            type="text"
            id="authorNameInput"
            value={searchbarInput}
            onChange={(e) => handleSearchbarAuthor(e.target.value)}
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

          <div className="searchResults">
            {searchbarInput !== "" &&
              searchbarPressed &&
              searchResultsAuthors.map((result, id) => (
                <div
                  key={id}
                  onClick={() =>
                    handleSearchBarClickAuthor(
                      result.author_id,
                      result.author_name
                    )
                  }
                >
                  {result.author_name}
                </div>
              ))}
          </div>

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
