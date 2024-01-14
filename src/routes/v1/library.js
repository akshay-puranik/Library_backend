var router = require("express").Router();
const userController = require("../../controllers/user");

router.post("/library/signup", userController.signUp);
router.post("/library/signin", userController.signIn);

// (These are public endpoints. Make sure to include the Access token and refresh token in the
// response body with roles specification)



// (These are private endpoints. Make sure to setup the Access token in Headers)

// GET /library/books
// router.get("/library/books", );
// GET /library/books/:bookId
// router.get("/library/books/:bookid", );
// POST /library/checkout/:bookId
// router.post("/library/checkout/:bookid", );
// POST /library/checkout/return-book/:bookId
// router.post("/library/return-book/:bookid", );

// POST /library/book
// PUT /library/:bookId
// PATCH /library/:bookId

// router.post("/library/update/id", );
// router.post("/library/activate/id", );

module.exports = router;
