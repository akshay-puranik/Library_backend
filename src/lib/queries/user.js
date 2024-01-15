const userModel = require("../../models/user");

const getSingleUser = async (query) => {
  return await userModel.findOne(query);
};

const createUser = async (data) => {
  return await userModel.create(data);
};

module.exports = {
  getSingleUser,
  createUser
};
