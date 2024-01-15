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
    const query = req.query;
    let page = query.page || 0;
    let size = query.size || 8;
    let skip = page * size;

    const books = await bookQuery.getBooks({ size, skip });

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
    data = data.toJSON();

    if (data) {
      return response.sendResponse(
        constant.response_code.SUCCESS,
        `Book Added Successfully`,
        data,
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

const updateBook = async (req, res) => {
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
    const params = req.params;

    let {bookid} = params;

    let data = await bookQuery.updateBook({_id:bookid},body);
    if (!data) {
      return response.sendResponse(
        constant.response_code.RECORD_NOT_FOUND,
        `Book Update Failed`,
        data,
        res
      );
    }
    data = data.toJSON();
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      data,
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
    const params = req.params;
    const { bookid } = params;

    const book = await bookQuery.getSingleBook({ _id: bookid });
    book = book.toJSON();

    if (!book) {
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
      book,
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

const checkoutBook = async (req, res) => {
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
    const params = req.params;

    let {bookid} = params;
    let {userid} = body;

    
    // let data = await bookQuery.createBook(body);
    // data = data.toJSON();

    // if (data) {
    //   return response.sendResponse(
    //     constant.response_code.SUCCESS,
    //     `Book Added Successfully`,
    //     data,
    //     res
    //   );
    // }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      null,
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

const returnBook = async (req, res) => {
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
    const params = req.params;

    let {bookid} = params;
    let {userid} = body;


    // let data = await bookQuery.createBook(body);
    // data = data.toJSON();

    // if (data) {
    //   return response.sendResponse(
    //     constant.response_code.SUCCESS,
    //     `Book Added Successfully`,
    //     data,
    //     res
    //   );
    // }
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "Success",
      null,
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

module.exports = { getBooks, getSingleBook, addBook, updateBook, checkoutBook, returnBook };
