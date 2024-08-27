const connection = require("../../db/connection");
const format = require("pg-format");

exports.fetchArticleId = (params) => {
  const { article_id } = params;
  let queryString = "SELECT * FROM articles ";
  let queryArray = [];

  if (article_id) {
    queryString += "WHERE article_id = $1";
    queryArray.push(article_id);
  }

  return connection.query(queryString, queryArray).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: "Not found" });
    } else {
      return rows;
    }
  });
};

exports.fetchAllArticles = (order) => {
  const orderAllowed = ["ASC", "DESC"];
  if (!orderAllowed.includes(order)) {
    return Promise.reject({ status: 400, msg: "Bad request" });
  }
  const queryString = format(
    `SELECT articles.author, articles.title, articles.article_id, articles.topic, articles.created_at, articles.votes, articles.article_img_url, COUNT(comments.comment_id) AS comment_count FROM articles LEFT JOIN comments USING (article_id) GROUP BY articles.article_id ORDER BY articles.created_at %s`,
    [order]
  );
  return connection.query(queryString).then(({ rows }) => {
    return rows;
  });
};
