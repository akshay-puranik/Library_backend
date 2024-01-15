const jwt = require("jsonwebtoken");
const constant = require("../constants/constants");
const response = require("../lib/response");

const authorization = (req, res, next) => {
  const accessToken = req.headers["access-token"];
  if (accessToken) {
    try {
      let user = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY);
      req.body.userid = user.userid;
      next();
    } catch (err) {
      return response.sendResponse(
        constant.response_code.INTERNAL_SERVER_ERROR,
        err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
        null,
        res
      );
    }
  } else {
    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      constant.STRING_CONSTANTS.INVALID_AUTHORIZATION,
      null,
      res,
      null
    );
  }
};

module.exports = authorization;
