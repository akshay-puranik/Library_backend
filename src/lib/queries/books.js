const booksModel = require("../../models/books");

const getSingleBook = (query) => {
  return booksModel.findOne(query);
};

const getBooks = (query) => {
  return booksModel.findOne(query);
};

const addBook = async (data) => {
  return await booksModel.create(data);
};

module.exports = {
  getSingleBook,
  addBook
};
