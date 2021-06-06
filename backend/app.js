const express = require("express");
const app = express();
const cors = require("cors");
const api = require('./routes/index.js');

app.use(cors());

app.use(express.json());

app.use("/api", api);

module.exports = app;
