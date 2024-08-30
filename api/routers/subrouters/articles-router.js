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
articlesRouter
  .route("/:article_id/comments")
  .get(getArticleComments)
  .post(postArticleComment);
articlesRouter.patch("/:article_id", patchArticleById);

module.exports = articlesRouter;
