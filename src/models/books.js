const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    genre: { type: String, required: true },
    publishedOn: { type: Number, required: true },
    availableCopies: { type: Number },
    totalCopies: { type: Number },
  },
  { timestamps: true }
);

bookSchema.methods.toJSON = function () {
  var obj = this.toObject();
  delete obj.createdAt;
  delete obj.updatedAt;
  delete obj.__v;
  return obj;
};

const booksModel = mongoose.model("books", bookSchema);

module.exports = booksModel;
