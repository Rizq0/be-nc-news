const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topic-controllers");
const { serverErrorHandler } = require("./error-handlers");
const { getApiEndpoints } = require("./controllers/api-controllers");

app.get("/api", getApiEndpoints);
app.get("/api/topics", getAllTopics);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// keep this at the bottom
app.use(serverErrorHandler);

module.exports = { app };
