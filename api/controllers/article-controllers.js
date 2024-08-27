const {
  fetchArticleId,
  fetchAllArticles,
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
  const { order = "DESC" } = req.params;
  fetchAllArticles(order)
    .then((articles) => {
      res.status(200).send({ articles });
    })
    .catch((err) => {
      next(err);
    });
};
