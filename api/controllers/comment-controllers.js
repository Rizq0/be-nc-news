const { removeCommentById } = require("../models/comment-models");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(204).send();
      }
    })
    .catch((err) => {});
};
