const express = require("express");
require("dotenv").config();
const routes = require("./routes");
const cors = require("cors");
const constants = require("./constants/constants");
const app = express();
const port = process.env.PORT || "3000";
const response = require("./lib/response");
const { dbConnect } = require("../config/dbConnect");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use("/", routes);

app.listen(port,async () => {
	await dbConnect();
	console.log(`Server running on Port ${port}`);
})

module.exports = app;
