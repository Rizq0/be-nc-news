const {
  getAllArticles,
  getArticleById,
  getArticleComments,
  postArticleComment,
  patchArticleById,
} = require("../../controllers/article-controllers");
const articlesRouter = require("express").Router();

articlesRouter.get("/", getAllArticles);
articlesRouter.get("/:article_id", getArticleById);
articlesRouter.get("/:article_id/comments", getArticleComments);
articlesRouter.post("/:article_id/comments", postArticleComment);
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
