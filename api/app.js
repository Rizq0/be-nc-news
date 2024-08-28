const express = require("express");
const app = express();
const { getAllTopics } = require("./controllers/topic-controllers");
const {
  psqlErrorHandler,
  customErrorHandler,
  serverErrorHandler,
} = require("./error-handlers");
const { getApiEndpoints } = require("./controllers/api-controllers");
const {
  getArticleById,
  getAllArticles,
  getArticleComments,
  postArticleComment,
  patchArticleById,
} = require("../api/controllers/article-controllers");
const { deleteCommentById } = require("./controllers/comment-controllers");
app.use(express.json());

app.get("/api", getApiEndpoints);
app.get("/api/topics", getAllTopics);
app.get("/api/articles", getAllArticles);
app.get("/api/articles/:article_id", getArticleById);
app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postArticleComment);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteCommentById);

app.all("/*", (req, res) => {
  res.status(404).send({ msg: "Route not found" });
});

// keep this at the bottom
app.use(psqlErrorHandler);
app.use(customErrorHandler);
app.use(serverErrorHandler);

module.exports = { app };
