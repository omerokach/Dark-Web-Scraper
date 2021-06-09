const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes/index.js");
const { scraper } = require("./utils/utils");
var cron = require("node-cron");

cron.schedule("20 * * * * * * * *", async () => {
  const res = await scraper();
  if (res.status === "success") {
    console.log("Scraper Success");
  } else {
    console.log(res);
  }
});

app.use(cors());

app.use(express.json());

app.use("/api", api);

module.exports = app;
