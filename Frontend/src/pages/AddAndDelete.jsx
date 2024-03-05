import { useState, useEffect } from "react";
import api from "../components/api";
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
  const [searchResultsBook, setSearchResultsBook] = useState([]);
  const [searchResultsAuthors, setSearchResultsAuthors] = useState([]);
  const [searchbarInput, setSearchbarInput] = useState([]);

  useEffect(() => {
    if (showBox) {
      fetchBooks();
      fetchAuthors();
    }
  }, [showBox]);

  const fetchAuthors = async () => {
    try {
      const response = await api.get("/authors");
      setAuthors(response.data);
    } catch (error) {
      console.error("Error fetching authors:", error);
    }
  };

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
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
  const fetchAuthorsSB = (value) => {
    fetch("http://localhost:2222/authors")
      .then((response) => response.json())
      .then((json) => {
        const results = json.filter((authors) => {
          return (
            authors.author_name &&
            authors.author_id &&
            authors.author_name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setSearchResultsAuthors(results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const addBook = async () => {
    try {
      await api.post(`/addbooktodb/${selectedAuthor}/`, {
        bookName: bookNameInput,
      });
    } catch (error) {
      console.error("Error adding book:", error);
    }
    clearWindows();
  };

  const addAuthor = async () => {
    try {
      await api.post(`/addauthor/`, {
        authorName: authorNameInput,
      });
    } catch (error) {
      console.log("Error adding author:", error);
    }
    clearWindows();
  };

  const deleteBook = async () => {
    try {
      await api.delete(`/deletebook/${selectedBook}/`);
    } catch (error) {
      console.error("Error deleting book", error);
    }
    clearWindows();
  };
  const deleteAuthor = async () => {
    try {
      await api.delete(
        `/deleteauthor/${selectedAuthor}/`
      );
    } catch (error) {
      console.error("Error deleting author", error);
    }
    clearWindows();
  };

  const updateBox = (state) => {
    clearWindows();
    setShowBox(state);
  };
  const handleAuthorChoice = (e) => {
    setSelectedAuthor(e.target.value);
  };
  const handleInputBook = (e) => {
    setBookNameInput(e.target.value);
  };
  const handleInputAuthor = (e) => {
    setAuthorNameInput(e.target.value);
  };
  const handleSearchbarBook = (value) => {
    setSearchbarInput(value);
    fetchBooksSB(value);
  };
  const handlesSearchBarClickBook = (id, name) => {
    setSelctedBook(id);
    setSearchbarInput(name);
    setSearchbarPressed(false);
  };
  const handleSearchbarAuthor = (value) => {
    setSearchbarInput(value);
    fetchAuthorsSB(value);
  };
  const handlesSearchBarClickAuthor = (id, name) => {
    setSelectedAuthor(id);
    setSearchbarInput(name);
    setSearchbarPressed(false);
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
      <button onClick={() => updateBox("addBook")}>Legg til bok</button>{" "}
      <button onClick={() => updateBox("addAuthor")}>Legg til forfatter</button>{" "}
      <button onClick={() => updateBox("deleteBook")}>Slett bok</button>{" "}
      <button onClick={() => updateBox("deleteAuthor")}>Slett forfatter</button>
      {showBox === "addBook" && (
        <div className="addingBox">
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
                    handlesSearchBarClickAuthor(
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
        </div>
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
            <button onClick={() => clearWindows()}>
              Tilbake
            </button>
            <button onClick={() => addAuthor()}>
              Lagre
            </button>
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
                    handlesSearchBarClickAuthor(
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
