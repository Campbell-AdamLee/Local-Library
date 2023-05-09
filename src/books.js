function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  // Initialize the two arrays for checked-out and returned books
  const checkedOutBooks = [];
  const returnedBooks = [];

  // Iterate over all the books and partition them based on their borrowed status
  books.reduce((acc, book) => {
    const [latestTransaction] = book.borrows;
    if (latestTransaction.returned) {
      returnedBooks.push(book);
    } else {
      checkedOutBooks.push(book);
    }
  }, []);

  // Return the two arrays of checked-out and returned books
  return [checkedOutBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowers = [];
  for (let transaction of book.borrows) {
    const account = accounts.find(acc => acc.id === transaction.id);
    account.returned = transaction.returned;
    borrowers.push(account);
  }
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
