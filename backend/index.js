const app = require("./app");
const mongoose = require("mongoose");
const PORT = 8080;

app.listen(PORT, () => {
  mongoose
    .connect("mongodb://localhost:27017/onionScraper", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,  
      useCreateIndex: true,
    })
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch(() => {
      console.log("There was a problem connecting to mongodb");
    });
  console.log("App listeting to port", PORT);
});

module.exports = mongoose;
