const express = require("express");
const app = express();
const { intervalMin } = require("./controllers/intervalController");
const cors = require("cors");
const api = require("./routes/index.js");
const { scraper } = require("./utils/utils");
const cron = require("node-cron");

cron.schedule(`*/2 * * * *`, async () => {
  const res = await scraper();
  if (res === "success") {
    console.log("Scraper Success");
  } else {
    console.log(res);
  }
});

app.use(cors());

app.use(express.json());

app.use("/api", api);

module.exports = app;
