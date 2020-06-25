function goodreadsService() {
  function getBookById(bookId) {
    return new Promise((resolve, reject) => {
      resolve({ description: 'book description' });
    });
  }

  return { getBookById };
}

module.exports = goodreadsService();
