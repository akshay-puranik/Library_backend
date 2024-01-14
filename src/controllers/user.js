const { validationResult } = require("express-validator");
const constant = require("../constants/constants");
const { getSingleUser, createUser } = require("../lib/queries/user");
const { getTokens, generateAccessToken } = require("./jwt");

const signUp = async (req, res) => {
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
    const { name, email, password } = req.body;
    const checkUser = getSingleUser({ email });

    if (checkUser) {
      return response.sendResponse(
        constant.response_code.CONFLICT,
        `User with this email: ${email} already exists!`,
        null,
        res
      );
    }
    await createUser({ name, email, password });
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "User Created Successfully!",
      template,
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

const signIn = async (req, res) => {
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
    const { email, password } = req.body;
    const user = getSingleUser({ email, password });

    if (user) {
      let { accessToken, refreshToken } = getTokens(user);
      return response.sendResponse(
        constant.response_code.SUCCESS,
        "User Created Successfully!",
        { accessToken, refreshToken },
        res
      );
    }

    return response.sendResponse(
      constant.response_code.UNAUTHORIZED,
      "Invalid Credentials!",
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

const requestToken = async (req, res) => {
  try {
    let accessToken = generateAccessToken(req.params.refreshToken);
    return response.sendResponse(
      constant.response_code.SUCCESS,
      "New access token generated!",
      { accessToken },
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

module.exports = { signIn, signUp, requestToken };
