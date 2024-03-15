require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./dbservice");

const jwt = require("jsonwebtoken");

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

app.post("/users/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = { name: username };
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  try {
    const info = await db.checkLogin(username, password);
    if (info.length > 0) {
      res.send({
        success: true,
        message: "Pålogging vellykket",
        user: info[0],
        accessToken: accessToken,
      });
    } else {
      res.send({ success: false, message: "Feil brukernavn eller passord" });
    }
  } catch (error) {
    res.send({ success: false, message: "Intern serverfeil" });
  }
});

app.get("/users", authenticateToken, async (req, res) => {
  try {
    const loggedInUsername = req.user.name;
    const user = await db.getUserByUsername(loggedInUsername);
    if (user && user.length === 1) {
      res.send(user[0]);
    } else {
      res.status(404).send("Bruker ikke funnet, eller mer en enn bruker");
    }
  } catch (error) {
    console.log("Feil ved henting av brukerinformasjon:", error.message);
    res.status(500).send("Intern serverfeil");
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // 401 = unauthorized, no access

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

app.post("/checkusername", async (req, res) => {
  const username = req.body.username;
  try {
    const info = await db.checkUsername(username);
    if (info.length > 0) {
      res.send({ available: false });
    } else {
      res.send({ available: true });
    }
  } catch (error) {
    res.send({ error });
  }
});

app.listen(2222, () => {
  console.log("listening");
});
