const { check, query } = require("express-validator");
const Errors = {
  USER_CREDENTIALS: [
    check("email", "email should be a non empty string")
      .exists()
      .notEmpty()
      .isEmail(),
    check("password", "password should be a non empty string")
      .exists()
      .notEmpty()
      .isString(),
  ],
  USER_NAME: [
    check("name", "name should be a non empty string")
      .exists()
      .notEmpty()
      .isString(),
  ],
  BOOK_LIST: [
    query("size", "size should a number")
      .optional()
      .isInt({ min: 1 })
      .isNumeric(),
    query("page", "page should a number").optional().isNumeric(),
  ],
  BOOK_DETAILS_ADD: [
    check("title", "title should be a non empty string")
      .exists()
      .notEmpty()
      .isString(),
    check("author", "author should be a non empty string")
      .exists()
      .notEmpty()
      .isString(),
    check("genre", "genre should be a non empty string")
      .exists()
      .notEmpty()
      .isString(),
    check("publishedOn", "publishedOn should be a non empty string")
      .exists()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
    check("availableCopies", "availableCopies should be a non empty string")
      .exists()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
    check("totalCopies", "totalCopies should be a non empty string")
      .exists()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
  ],
  BOOK_DETAILS_UPDATE: [
    check("title", "title should be a non empty string")
      .optional()
      .notEmpty()
      .isString(),
    check("author", "author should be a non empty string")
      .optional()
      .notEmpty()
      .isString(),
    check("genre", "genre should be a non empty string")
      .optional()
      .notEmpty()
      .isString(),
    check("publishedOn", "publishedOn should be a non empty string")
      .optional()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
    check("availableCopies", "availableCopies should be a non empty string")
      .optional()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
    check("totalCopies", "totalCopies should be a non empty string")
      .optional()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
  ],
  USER_CHECKOUT_BOOK: [
    check("returnDate", "returnDate should be a non empty string")
      .optional()
      .isNumeric()
      .notEmpty()
      .isInt({ gt: 0 }),
  ],
};
module.exports = Errors;
