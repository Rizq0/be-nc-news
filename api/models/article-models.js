const connection = require("../../db/connection");

exports.fetchArticleId = (params) => {
  const { article_id } = params;
  let queryString = "SELECT * FROM articles ";
  let queryArray = [];

  if (article_id) {
    queryString += "WHERE article_id = $1";
    queryArray.push(article_id);
  }

  return connection.query(queryString, queryArray).then(({ rows }) => {
    return rows;
  });
};
