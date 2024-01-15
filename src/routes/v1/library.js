var router = require("express").Router();
const userController = require("../../controllers/user");
const booksController = require("../../controllers/books");
const authorization = require("../../middlewares/authorization");

/* USER AUTH ROUTES */
router.post("/library/signup", userController.signUp);
router.post("/library/signin", userController.signIn);
/* USER AUTH ROUTES */

/* USER BOOKS ROUTES */
router.get("/library/books", authorization, booksController.getBooks);
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
  booksController.checkoutBook
);
router.post(
  "/library/return-book/:bookid",
  authorization,
  booksController.returnBook
);
/* CHECKOUT ROUTES */

/* ADMIN ADDUPDATE BOOKS ROUTES */
router.post("/library/book", authorization, booksController.addBook);
router.put("/library/:bookid", authorization, booksController.updateBook);
/* ADMIN ADDUPDATE BOOKS ROUTES */

module.exports = router;
