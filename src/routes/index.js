const express = require("express");

const router = express.Router();
const fs = require("fs");
const constant = require("../constants/constants");

fs.readdirSync(__dirname).forEach((file) => {
  if (file === "index.js" || file.indexOf(".js") !== constant.INDEX_NOT_FOUND)
    return;
  if (file) {
    router.use(`/${file}`, require(`./${file}`));
  }
});

module.exports = router;
