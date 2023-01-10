const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const db = require("./models");

dotenv.config();

app.use(cors());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

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

//Routes
//User
app.use("/user", require("./routes/users/user.router.js"));

//Presentations
app.use(
  "/presentation",
  require("./routes/presentations/presentation.router.js")
);
app.use("/slide", require("./routes/presentations/slide.router.js"));
app.use("/option", require("./routes/presentations/option.router.js"));

app.get("/", (req, res) => {
  res.json({ message: "Welcome to Turing.com" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
