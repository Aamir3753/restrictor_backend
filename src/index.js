require("./config/db")();
const http = require("http");
const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const listEndpoints = require("express-list-endpoints");

const routes = require("./routes");

const port = process.env.PORT ? process.env.PORT : 4001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/healthCheck", (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  if (dbStatus) {
    res.statusCode = 200;
    res.json({ health: "Application is running in good state! update update" });
  } else {
    res.statusCode = 500;
    res.json({ health: "DB disconnected!: " + dbStatus });
  }
});

app.use(morgan("dev"));

app.use(routes);

app.use((err, req, res, next) => {
  console.log(err);
  res.statusCode = err.statusCode ? err.statusCode : 400;
  res.json({ message: err.message, codeName: err.codeName });
});

const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Server is started on port: ${port}`);
  console.log(listEndpoints(app));
});
