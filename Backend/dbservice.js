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
}
function getBooks(authorId = "") {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT book_id, book_name, author_id, book_summary, is_read FROM dbo.Books";
    if (authorId) query += ` WHERE author_id=${authorId}`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
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
}
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
}
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
}
function addAuthor(authorName) {
  return new Promise((resolve, reject) => {
    const maxAuthorQuery = `SELECT MAX(author_id) AS maxAuthorId from dbo.Authors`;
    sql.query(connectionString, maxAuthorQuery, (err, result) => {
      if (err) {
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
}
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
}
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
}
function addUser(username, password) {
  return new Promise((resolve, reject) => {
    const maxUserIdQuery = `SELECT MAX(user_id) AS maxUserId FROM dbo.Users`;
    sql.query(connectionString, maxUserIdQuery, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      const maxUserId = result[0].maxUserId;
      const newUserId = maxUserId + 1;
      const query = `INSERT INTO dbo.Users (user_id, user_name, user_password) VALUES(${newUserId}, '${username}', '${password}')`;
      sql.query(connectionString, query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  });
}

function checkLogin(username, password) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * From dbo.Users WHERE user_name='${username}' AND user_password='${password}'`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function getUserByUsername(loggedInUsername) {
  return new Promise((resolve, reject) => {
    const query = `SELECT * From dbo.Users WHERE user_name='${loggedInUsername}'`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

function checkUsername(username) {
  return new Promise((resolve, reject) => {
    const query = `SELECT user_name From dbo.Users WHERE user_name='${username}'`;
    sql.query(connectionString, query, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}

module.exports = {
  getAuthors: getAuthors,
  getBooks: getBooks,
  changeIsRead: changeIsRead,
  addSummary: addSummary,
  addBook: addBook,
  addAuthor: addAuthor,
  deleteBook: deleteBook,
  deleteAuthor: deleteAuthor,
  addUser: addUser,
  checkLogin: checkLogin,
  checkUsername: checkUsername,
  getUserByUsername: getUserByUsername,
};
