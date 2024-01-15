const booksModel = require("../../models/books");

const getSingleBook = async (query) => {
  return await booksModel.findOne(query);
};

const getBooks = async (query) => {
  const { skip, size } = query;
  return await booksModel.aggregate([{ $skip: +skip }, { $limit: +size }]);
};

const createBook = async (data) => {
  return await booksModel.create(data);
};

const updateBook = async (query,data) => {
  return await booksModel.findOneAndUpdate(query,data);
};

module.exports = {
  getSingleBook,
  createBook,
  getBooks,
  updateBook
};
