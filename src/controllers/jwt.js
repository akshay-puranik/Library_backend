const constant = require("../constants/constants");
const jwt = require("jsonwebtoken");

const generateRefreshToken = (data) => {
  try {
    let refToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET_KEY, {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
    });
    return refToken;
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

const generateAccessToken = (refreshToken) => {
  try {
    let refTokenData = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    let accessToken = jwt.sign(
      refTokenData.process.env.ACCESS_TOKEN_SECRET_KEY,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME }
    );
    return accessToken;
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

const getTokens = (data) => {
  try {
    const refreshToken = generateRefreshToken(data);
    const accessToken = generateAccessToken(data);
    return { accessToken, refreshToken };
  } catch (err) {
    return response.sendResponse(
      constant.response_code.INTERNAL_SERVER_ERROR,
      err.message || constant.STRING_CONSTANTS.SOME_ERROR_OCCURED,
      null,
      res
    );
  }
};

module.exports = { getTokens, generateAccessToken, generateRefreshToken };
