const sql = require("msnodesqlv8");
const connectionString = "Server=DESKTOP-D6K8JFR\\SQLEXPRESS;Database=HomeLibrary;Trusted_Connection=True;Driver={SQL Server}";

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
function getBooks() {
    return new Promise((resolve, reject) => {
        const query = "SELECT book_id, book_name, author_id, book_summary, is_read FROM dbo.Books";
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
function getAllBooksFromAuthor(authorId) {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM dbo.Books WHERE author_id=${authorId}`;
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

function changeIsRead(bookId, change){
    return new Promise((resolve, reject) => {
        const query =`UPDATE dbo.Books SET is_read = ${change} WHERE book_id=${bookId}`;
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
function addSummary(bookId, text){
    return new Promise((resolve, reject) => {
        const query =`UPDATE dbo.Books SET book_summary = '${text}' WHERE book_id=${bookId}`;
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
    getAllBooksFromAuthor: getAllBooksFromAuthor,
    changeIsRead: changeIsRead,
    addSummary: addSummary,
};

