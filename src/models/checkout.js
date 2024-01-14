const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema(
  {
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "books",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    checkoutDate: { type: Number },
    returnDate: { type: Number },
    status: {
      type: String,
      enums: ["Issued", "Returned", "Available"],
      default: "Available",
    },
  },
  { timestamps: true }
);

checkoutSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const checkoutModel = mongoose.model("checkout", checkoutSchema);

module.exports = checkoutModel;
