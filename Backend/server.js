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
app.get("/books/:authorId", async (req, res) => {
    const info = await db.getAllBooksFromAuthor(authorId);
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

app.patch("/booksread/1", async (req, res) => {
    const info = await db.changeIsRead(1, 1);
    res.send(info);
})
app.patch("/booksread/2", async (req, res) => {
    const info = await db.changeIsRead(2, 1);
    res.send(info);
})
app.patch("/booksread/3", async (req, res) => {
    const info = await db.changeIsRead(3, 1);
    res.send(info);
})
app.patch("/booksread/4", async (req, res) => {
    const info = await db.changeIsRead(4, 1);
    res.send(info);
})
app.patch("/booksread/5", async (req, res) => {
    const info = await db.changeIsRead(5, 1);
    res.send(info);
})



// app.patch("/books/6", async (req, res) => {
//     const { newIsReadValue } = req.body;
  
//     if (typeof newIsReadValue === "undefined") {
//       return res.status(400).send("Missing 'newIsReadValue' in request body");
//     }
  
//     const info = await db.changeIsRead(6, newIsReadValue);
//     res.send(info);
//   });




// post, get, patch, delete, put
// lese på new Promise og async/awaits

app.listen(2222, () => {
  console.log("listening");
});
