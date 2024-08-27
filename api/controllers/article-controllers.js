const {
  fetchArticleId,
  fetchAllArticles,
  fetchArticleComments,
} = require("../models/article-models");

exports.getArticleById = (req, res, next) => {
  const { params } = req;
  fetchArticleId(params)
    .then((article) => {
      res.status(200).send({ article });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getAllArticles = (req, res, next) => {
  const { order = "DESC" } = req.query;
  fetchAllArticles(order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};

exports.getArticleComments = (req, res, next) => {
  const { order = "ASC" } = req.query;
  const { article_id } = req.params;
  fetchArticleComments(article_id, order)
    .then(({ rows }) => {
      res.status(200).send({ comments: rows });
    })
    .catch((err) => {
      next(err);
    });
};
