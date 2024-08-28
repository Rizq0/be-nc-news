const e = require("express");
const {
  fetchArticleId,
  fetchAllArticles,
  fetchArticleComments,
  setArticleComment,
  updateArticleById,
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

exports.postArticleComment = (req, res, next) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  if (username === undefined || body === undefined) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    setArticleComment(article_id, username, body)
      .then((comment) => {
        res.status(201).send({ comment });
      })
      .catch((err) => {
        next(err);
      });
  }
};

exports.patchArticleById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { article_id } = req.params;
  if (inc_votes === undefined) {
    res.status(400).send({ msg: "Bad request" });
  } else {
    updateArticleById(article_id, inc_votes)
      .then((update) => {
        res.status(200).send({ update });
      })
      .catch((err) => {
        next(err);
      });
  }
};
