const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topic-controllers");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handlers");
const { getApiEndpoints } = require("./controllers/api-controllers");
const { getArticleById } = require("../api/controllers/article-controllers");

app.get("/api", getApiEndpoints);
app.get("/api/topics", getAllTopics);
app.get("/api/articles/:article_id", getArticleById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// keep this at the bottom
app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = { app };
