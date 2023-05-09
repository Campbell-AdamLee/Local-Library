function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
  }
 
function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) =>
      accountA.name.last.toLowerCase() > accountB.name.last.toLowerCase() ? 1 : -1
    );
  }

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  return books.reduce((totalBorrows, book) => {
    const borrows = book.borrows;
    const numOfBorrows = borrows.filter((borrow) => borrow.id === accountId).length;
    return totalBorrows + numOfBorrows;
  }, 0);
}

function getBooksPossessedByAccount(account, books, authors) {
  // Filter all the books checked out by the given account
  const checkedOutBooks = books.filter((book) => {
    const latestTransaction = book.borrows[0];
    return latestTransaction.id === account.id && !latestTransaction.returned;
  });
  
  // For each checked-out book, find the corresponding author and create a new object with the necessary information
  const result = checkedOutBooks.map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return {
      id: book.id,
      title: book.title,
      genre: book.genre,
      authorId: author.id,
      author: {
        name: `${author.name.first} ${author.name.last}`,
      },
      borrows: book.borrows,
    };
  });
  
  return result;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
