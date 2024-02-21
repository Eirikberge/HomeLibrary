const express = require("express");
const cors = require("cors");
const app = express();
const db = require('./dbservice');

app.use(cors());

app.get("/authors", async (req, res) => { 
    const info = await db.getAuthors();
    res.send(info);
});
app.get("/books", async (req, res) => {

    const booksInfo = await db.getBooks();
    res.send(booksInfo);
});
app.get("/books/:authorId", async (req, res) => {
    const authorId = req.params.authorId;
    const info = await db.getAllBooksFromAuthor(authorId);
    res.send(info);
});
app.patch("/bookisread/:bookId/:change", async (req, res) => {
    const bookId = req.params.bookId;
    const change = req.params.change;
    const info = await db.changeIsRead(bookId, change);
    res.send(info);
});

// post, get, patch, delete, put
// lese på new Promise og async/awaits

app.listen(2222, () => {
  console.log("listening");
});
