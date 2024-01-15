const checkoutModel = require("../../models/checkout");

const getSingleCheckoutDetails = async (query) => {
  return await checkoutModel.findOne(query);
};

const createCheckout = async (data) => {
  return await checkoutModel.create(data);
};

const updateCheckout = async (query, data) => {
  return await checkoutModel.findOneAndUpdate(query, data);
};

module.exports = {
  getSingleCheckoutDetails,
  createCheckout,
  updateCheckout,
};
