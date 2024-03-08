const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./dbservice");

app.use(cors());
app.use(express.json());

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
  const info = await db.getBooks(authorId);
  res.send(info);
});
app.patch("/bookisread/:bookId/:change", async (req, res) => {
  const bookId = req.params.bookId;
  const change = req.params.change;
  const info = await db.changeIsRead(bookId, change);
  res.send(info);
});
app.patch("/summary/:bookId/", async (req, res) => {
  const bookId = req.params.bookId;
  const text = req.body.text;
  const info = await db.addSummary(bookId, text);
  res.send(info);
});
app.post("/addbooktodb/:selectedAuthor/", async (req, res) => {
  const selectedAuthor = req.params.selectedAuthor;
  const bookName = req.body.bookName;
  const info = await db.addBook(selectedAuthor, bookName);
  res.send(info);
});
app.post("/addauthor", async (req, res) => {
  const authorName = req.body.authorName;
  const info = await db.addAuthor(authorName);
  res.send(info);
});
app.delete("/deletebook/:bookId", async (req, res) => {
  const bookId = req.params.bookId;
  const info = await db.deleteBook(bookId);
  res.send(info);
});
app.delete("/deleteauthor/:authorId", async (req, res) => {
  const authorId = req.params.authorId;
  const info = await db.deleteAuthor(authorId);
  res.send(info);
});
app.post("/adduser", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const info = await db.addUser(username, password);
  res.send(info);
});
// app.post("/login", async(req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     const info = await db.checkLogin(username, password)
//     res.send(info);
// })

app.post("/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    const info = await db.checkLogin(username, password);
    if (info.length > 0) {
      res.send({
        success: true,
        message: "Pålogging vellykket",
        user: info[0],
      });
    } else {
      res.send({ success: false, message: "Feil brukernavn eller passord" });
    }
  } catch (error) {
    res.send({ success: false, message: "Intern serverfeil" });
  }
});

app.listen(2222, () => {
  console.log("listening");
});
