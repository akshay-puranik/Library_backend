const booksModel = require("../../models/books");

const getSingleBook = async (query) => {
  return await booksModel.findOne(query);
};

const getBooks = async (query) => {
  let skip = 5;
  let pageSize = 4;
  return await booksModel.aggregate([
    { $skip: skip },
    { $limit: pageSize }
  ])
};

const createBook = async (data) => {
  return await booksModel.create(data);
};

module.exports = {
  getSingleBook,
  createBook,
  getBooks
};
