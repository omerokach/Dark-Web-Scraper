const express = require("express");
const app = express();
const cors = require("cors");
const api = require("./routes/index.js");
const { scraper } = require("./utils/utils");
const CronJob = require("cron").CronJob;

const job = new CronJob("0 */2 * * * *", async function () {
  const res = await scraper();
  if (res.status === "success") {
    console.log("Scraper Success");
  } else {
    console.log(res);
  }
});
console.log("cron start");
job.start();

app.use(cors());

app.use(express.json());

app.use("/api", api);

module.exports = app;
