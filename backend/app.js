const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes/index.js");
const { scraper } = require("./utils/utils");
const CronJob = require("cron").CronJob;

console.log("Before job instantiation");
const job = new CronJob("0 */2 * * * *", function () {
  const res = scraper();
  if (res === "success") {
    console.log("Scraper Success");
  } else {
    console.log("Scraper failed");
  }
});
console.log("cron start");
job.start();

app.use(cors());

app.use(express.json());

app.use("/api", api);

module.exports = app;
