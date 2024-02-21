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
    try {
        const booksInfo = await db.getBooks();
        res.send(booksInfo);
    } catch (error) {
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
app.get("/books/3", async (req, res) => {
    const info = await db.getAllBooksFromAuthor(3);
    res.send(info);
});
app.get("/books/2", async (req, res) => {
    const info = await db.getAllBooksFromAuthor(2);
    res.send(info);
});
app.get("/books/1", async (req, res) => {
    const info = await db.getAllBooksFromAuthor(1);
    res.send(info);
});

// Henter verdien isRead, sendes til frontend

// app.get("/getAllBooksFromAuthor/:authorId", async (req, res) => {
//   const info = await db.getAllBooksFromAuthor(req.params.authorId);
//   res.send(info);
// });

// post, get, patch, delete, put
// lese på new Promise og async/awaits

app.listen(2222, () => {
  console.log("listening");
});
