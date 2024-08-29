const connection = require("../../db/connection");
const format = require("pg-format");
const { checkExists } = require("../../api/utility-functions/api-utils");
const e = require("express");

exports.fetchArticleId = (params) => {
  const { article_id } = params;
  let queryString = `
  SELECT articles.*, COUNT(comments.article_id) AS comment_count
  FROM articles
  LEFT JOIN comments using (article_id)
  WHERE articles.article_id = $1
  GROUP BY articles.article_id`;

  return connection.query(queryString, [article_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return rows;
    }
  });
};

exports.fetchAllArticles = (order, sortBy, topic) => {
  const orderUppercase = order.toUpperCase();
  const sortByLowercase = sortBy.toLowerCase();
  let topicExists = Promise.resolve();

  let queryString = `SELECT articles.*, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments USING (article_id) `;
  const queryValues = [];

  if (topic) {
    const topicLowerCase = topic.toLowerCase();
    queryString += `WHERE topic = %L `;
    queryValues.push(topicLowerCase);
    topicExists = checkExists("articles", "topic", topicLowerCase);
  }

  queryString += `GROUP BY articles.article_id ORDER BY %I %s`;
  queryValues.push(sortByLowercase, orderUppercase);

  const formattedQuery = format(queryString, ...queryValues);

  return topicExists
    .then(() => {
      return connection.query(formattedQuery);
    })
    .then(({ rows }) => {
      return rows;
    });
};

exports.fetchArticleComments = (article_id, order) => {
  const promiseCatcher = [];
  const valueCatcher = [];

  const orderAllowed = ["ASC", "DESC"];
  if (!orderAllowed.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }

  let queryString = `SELECT * FROM comments `;

  if (article_id) {
    queryString += `WHERE article_id = $1 `;
    valueCatcher.push(article_id);
    promiseCatcher.push(checkExists("articles", "article_id", article_id));
  }
  if (order) {
    queryString += `ORDER BY created_at ${order}`;
  }
  promiseCatcher.push(connection.query(queryString, valueCatcher));
  return Promise.all(promiseCatcher).then((results) => {
    if (results.length === 1) {
      return results[0];
    } else {
      return results[1];
    }
  });
};

exports.setArticleComment = (article, username, comment) => {
  const promiseCatcher = [
    checkExists("articles", "article_id", article),
    checkExists("users", "username", username),
  ];
  const valueCatcher = [comment, article, username];
  let queryString =
    "INSERT INTO comments (body, article_id, author) VALUES ($1, $2, $3) RETURNING *";

  return Promise.all(promiseCatcher)
    .then(() => {
      return connection.query(queryString, valueCatcher);
    })
    .then(({ rows }) => {
      return rows;
    });
};

exports.updateArticleById = (article, updateVote) => {
  const promiseCatcher = [checkExists("articles", "article_id", article)];
  const valueCatcher = [updateVote, article];
  let queryString = `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`;

  return Promise.all(promiseCatcher).then(() => {
    return connection.query(queryString, valueCatcher).then(({ rows }) => {
      return rows;
    });
  });
};
