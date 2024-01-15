const { validationResult } = require("express-validator");
const constant = require("../constants/constants");
const response = require("../lib/response");
const { getSingleUser, createUser } = require("../lib/queries/user");
const { getTokens, generateAccessToken } = require("./jwt");
const checkoutModel = require("../models/checkout");
const userModel = require("../models/user");

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
    const checkUser = await getSingleUser({ email });

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
    const user = await getSingleUser({ email, password });

    if (user?.id) {
      let data = user.toJSON();
      let { accessToken, refreshToken } = getTokens(data);

      delete data.password;

      return response.sendResponse(
        constant.response_code.SUCCESS,
        "Sign In Successfull!",
        { accessToken, refreshToken, userDetails: data },
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

const checkForLateFees = async () => {
  let currentDate = Math.floor(new Date(new Date()).getTime() / 1000);

  const lateCheckouts = await checkoutModel.find({ status: "issued" });

  lateCheckouts.forEach(async (checkout) => {
    if (currentDate > checkout.returnDate) {
      let user = await userModel.findById(checkout.userId);
      let { lateReturnFine } = user;
      await userModel.updateOne(
        { _id: checkout.userId },
        { lateReturnFine: lateReturnFine + 10 }
      );
    }
  });
};

module.exports = { signIn, signUp, requestToken, checkForLateFees };
