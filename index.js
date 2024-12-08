const bodyParser = require("body-parser");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const cors = require("cors");

dotenv.config({ path: ".env" });
const dbConnection = require("./config/database");

// Connect with db
dbConnection();

// express app
const app = express();
app.use(bodyParser.json());

// Enable other domains to access your application
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Mount Routes
mountRoutes(app);
app.get("/", function (req, res) {
  res.send({ msg: "Hello World!" });
});

app.all("*", (req, res, err) => {});

const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`App running running on port ${PORT}`);
});

app.listen(port, (req, res) => {
  console.log(`Example app listening on port ${port}!`);
});

// Handle rejection outside express
process.on("unhandledRejection", (err) => {
  console.error(`UnhandledRejection Errors: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error(`Shutting down....`);
    process.exit(1);
  });
});
