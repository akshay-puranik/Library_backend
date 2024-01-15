var router = require("express").Router();
const userController = require("../../controllers/user");
const booksController = require("../../controllers/books");
const authorization = require("../../middlewares/authorization");

router.post("/library/signup", userController.signUp);
router.post("/library/signin", userController.signIn);

router.get("/library/books", authorization, booksController.getBooks);
router.get("/library/books/:bookid", authorization, booksController.getSingleBook);

// router.post("/library/checkout/:bookid", );
// POST /library/checkout/return-book/:bookId
// router.post("/library/return-book/:bookid", );

// POST /library/book
router.post("/library/book", authorization, booksController.addBook);
router.put("/library/:bookid", authorization, booksController.updateBook);

// router.post("/library/update/id", );
// router.post("/library/activate/id", );

module.exports = router;
