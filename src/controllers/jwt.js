const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateRefreshToken = (data) => {
  try {
    let refToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET_KEY);
    return refToken;
  } catch (err) {
    throw new Error(err);
  }
};

const generateAccessToken = (refreshToken) => {
  try {
    let refTokenData = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET_KEY
    );
    let accessToken = jwt.sign(
      refTokenData,
      process.env.ACCESS_TOKEN_SECRET_KEY
    );
    return accessToken;
  } catch (err) {
    throw new Error(err);
  }
};

const getTokens = (data) => {
  try {
    const refreshToken = generateRefreshToken(data);
    const accessToken = generateAccessToken(refreshToken);
    return { accessToken, refreshToken };
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = { getTokens, generateAccessToken, generateRefreshToken };
