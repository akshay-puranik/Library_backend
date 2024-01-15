const { validationResult } = require("express-validator");
const constant = require("../constants/constants");
const response = require("../lib/response");
const bookQuery = require("../lib/queries/books");

const getBooks = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const books = await bookQuery.getBooks();

    if (!books) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `No Books Found!`,
        null,
        res
      );
    }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      books,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

const addBook = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const body = req.body;

    let data = await bookQuery.createBook(body);
    console.log(data);

    if (data) {
      return response.sendResponse(
        constant.response_code.SUCCESS,
        `Book Added Successfully`,
        null,
        res
      );
    }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      books,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

const getSingleBook = async (req, res) => {
  const errors = await validationResult(req);
  if (!errors.isEmpty()) {
    return response.sendResponse(
      constant.response_code.BAD_REQUEST,
      null,
      null,
      res,
      errors
    );
  }
  try {
    const books = await getBooks();

    if (books) {
      return response.sendResponse(
        constant.response_code.NOT_FOUND,
        `No Books Found!`,
        null,
        res
      );
    }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      books,
      res
    );
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};



module.exports = { getBooks, getSingleBook, addBook };
