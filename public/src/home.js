function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let count = 0;
  books.forEach(book => {
    if (!book.borrows[0].returned) {
      count++;
    }
  });
  return count;
}

function getMostCommonGenres(books) {
  // Create an object to store the count of each genre
  const genreCounts = {};
  
  // Loop through the books and increment the count for each genre
  books.forEach((book) => {
    if (genreCounts[book.genre]) {
        genreCounts[book.genre]++;
    } else {
        genreCounts[book.genre] = 1;
    }
  });
  
  // Convert the object to an array of key-value pairs, sort in descending order based on the count, and get the top five
  const sortedGenres = Object.entries(genreCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  
  // Create a new array of objects with the name and count properties
  const result = sortedGenres.map((genre) => {
    return {
      name: genre[0],
      count: genre[1],
    };
  });
  
  return result;
}
  

function getMostPopularBooks(books) {
  // Create an array of book objects with name and count properties
  const bookCount = books.map((book) => ({
    name: book.title,
    count: book.borrows.length
  }));
  
  // Sort the array of book objects by count property in descending order
  const sortedBooks = bookCount.sort((bookA, bookB) => bookB.count - bookA.count);
  
  // Return a new array with the top 5 books by count property
  return sortedBooks.slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  // Step 1
  const authorBorrows = {};

  // Step 2
  books.forEach(book => {
    // Step 3
    const { authorId, borrows } = book;
    const borrowCount = borrows.length;

    // Step 4
    if (authorBorrows[authorId]) {
      authorBorrows[authorId].count += borrowCount;
    } else {
      authorBorrows[authorId] = { author: authors.find(author => author.id === authorId), count: borrowCount };
    }
  });

  // Step 5
  const authorBorrowCounts = Object.values(authorBorrows);

  // Step 6
  authorBorrowCounts.sort((a, b) => b.count - a.count);

  // Step 7-9
  const result = [];
  for (let i = 0; i < authorBorrowCounts.length && i < 5; i++) {
    const authorBorrow = authorBorrowCounts[i];
    const { name: { first, last } } = authorBorrow.author;
    const authorName = `${first} ${last}`;
    const { count } = authorBorrow;
    const authorResult = { name: authorName, count };
    result.push(authorResult);
  }

  // Step 10
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
