const { query } = require("express");
const sql = require("msnodesqlv8");
const connectionString =
  "Server=DESKTOP-D6K8JFR\\SQLEXPRESS;Database=HomeLibrary;Trusted_Connection=True;Driver={SQL Server}";

function getAuthors() {
  return new Promise((resolve, reject) => {
    const query = "SELECT author_id, author_name, birth_year FROM dbo.Authors";
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function getBooks(authorId = "") {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT book_id, book_name, author_id, book_summary, is_read FROM dbo.Books";
    if (authorId)
    query += ` WHERE author_id=${authorId}`
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function changeIsRead(bookId, change) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE dbo.Books SET is_read = ${change} WHERE book_id=${bookId}`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function addSummary(bookId, text) {
  return new Promise((resolve, reject) => {
    const query = `UPDATE dbo.Books SET book_summary = '${text}' WHERE book_id=${bookId}`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function addBook(selectedAuthor, bookName) {
  return new Promise((resolve, reject) => {
    const maxBookIdQuery = `SELECT MAX(book_id) AS maxBookId FROM dbo.Books`;
    sql.query(connectionString, maxBookIdQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const maxBookId = result[0].maxBookId;
      const newBookId = maxBookId + 1;
      const query = `INSERT INTO dbo.Books(book_id, book_name, author_id, is_read) VALUES(${newBookId}, '${bookName}', ${selectedAuthor}, ${0})`;
      sql.query(connectionString, query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

function addAuthor(authorName) {
  return new Promise((resolve, reject) => {
    const maxAuthorQuery = `SELECT MAX(author_id) AS maxAuthorId from dbo.Authors`;
    sql.query(connectionString, maxAuthorQuery, (err, result) => {
      if(err) {
        reject(err);
        return;
      }
      const maxAuthorId = result[0].maxAuthorId;
      const newAuthorId = maxAuthorId + 1;
      const query = `INSERT INTO dbo.Authors(author_id, author_name) VALUES(${newAuthorId}, '${authorName}')`;
      sql.query(connectionString, query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
};

function deleteBook(bookId) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM dbo.Books WHERE book_id=${bookId}`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

function deleteAuthor(authorId) {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM dbo.Authors WHERE author_id=${authorId}`; 
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  getAuthors: getAuthors,
  getBooks: getBooks,
  changeIsRead: changeIsRead,
  addSummary: addSummary,
  addBook: addBook,
  addAuthor: addAuthor,
  deleteBook: deleteBook,
  deleteAuthor: deleteAuthor,
};
