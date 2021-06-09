const app = require("./app");
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const { scraperStatus } = require("./utils/utils");
global.io = require("socket.io")(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
const PORT = 8080;

// Socket setup
io.on("connection", (socket) => {
  console.log("Socket connected!");
  socket.on("disconnect", () => {
    console.log(`user has disconnected`);
  });
});

server.listen(PORT, () => {
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
