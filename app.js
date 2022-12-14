const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./models");
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

dotenv.config();

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// // drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and re-sync db.");
// });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("slidedata", (obj) => {
    console.log("data slide", obj);
    io.emit("data slide", obj);
  });
});

//Routes
app.use("/presentation", require("./routes/presentation.router.js"));
app.use("/slide", require("./routes/slide.router.js"));
app.use("/option", require("./routes/option.router.js"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Turing.com" });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
