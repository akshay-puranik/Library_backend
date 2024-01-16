var router = require("express").Router();
const userController = require("../../controllers/user");
const booksController = require("../../controllers/books");
const authorization = require("../../middlewares/authorization");
const Errors = require("../../middlewares/validator/book");

/* USER AUTH ROUTES */
router.post(
  "/library/signup",
  Errors.USER_CREDENTIALS,
  Errors.USER_NAME,
  userController.signUp
);
router.post("/library/signin", Errors.USER_CREDENTIALS, userController.signIn);
/* USER AUTH ROUTES */

/* USER BOOKS ROUTES */
router.get(
  "/library/books",
  authorization,
  Errors.BOOK_LIST,
  booksController.getBooks
);
router.get(
  "/library/books/:bookid",
  authorization,
  booksController.getSingleBook
);
/* USER BOOKS ROUTES */

/* CHECKOUT ROUTES */
router.post(
  "/library/checkout/:bookid",
  authorization,
  Errors.USER_CHECKOUT_BOOK,
  booksController.checkoutBook
);
router.post(
  "/library/return-book/:bookid",
  authorization,
  booksController.returnBook
);
/* CHECKOUT ROUTES */

/* ADMIN ADDUPDATE BOOKS ROUTES */
router.post(
  "/library/book",
  authorization,
  Errors.BOOK_DETAILS_ADD,
  booksController.addBook
);
router.put(
  "/library/:bookid",
  authorization,
  Errors.BOOK_DETAILS_UPDATE,
  booksController.updateBook
);
/* ADMIN ADDUPDATE BOOKS ROUTES */

module.exports = router;
