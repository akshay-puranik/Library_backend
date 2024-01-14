const userModel = require("../../models/user");

const getSingleUser = (query) => {
  return userModel.findOne(query);
};

const createUser = async (data) => {
  return await userModel.create(data);
};

module.exports = {
  getSingleUser,
  createUser
};
