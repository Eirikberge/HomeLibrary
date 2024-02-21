const sql = require("msnodesqlv8");
const connectionString = "Server=DESKTOP-D6K8JFR\\SQLEXPRESS;Database=HomeLibrary;Trusted_Connection=True;Driver={SQL Server}";

function getAuthors() {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM dbo.Authors"; // denne til a spesifisere alle kolonner
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
        const query = "SELECT * FROM dbo.Books";
        sql.query(connectionString, query, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}
// sette sammen, enten authorId eller alle
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

// function addBurthYearToAuthor(authorId, birthYear){
//     return new Promise((resolve, reject) => {
//         const query = `UPDATE dbo.Authors SET birth_year = ${birthYear} WHERE author_id=${authorId}`;
//         sql.query(connectionString, query, (err, rows) => {
//             if(err){
//                 reject(err);
//             } else {
//                 resolve(rows);
//             }
//         });
//     })
// }

module.exports = {
    getAuthors: getAuthors,
    getBooks: getBooks,
    getAllBooksFromAuthor: getAllBooksFromAuthor,
    changeIsRead: changeIsRead,
};

