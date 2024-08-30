const {
  removeCommentById,
  updateCommentById,
} = require("../models/comment-models");

exports.deleteCommentById = (req, res, next) => {
  const { comment_id } = req.params;
  removeCommentById(comment_id)
    .then((rowsDeleted) => {
      if (rowsDeleted === 1) {
        res.status(204).send();
      }
    })
    .catch((err) => {
      next(err);
    });
};

exports.patchCommentById = (req, res, next) => {
  const { inc_votes } = req.body;
  const { comment_id } = req.params;
  updateCommentById(inc_votes, comment_id)
    .then((update) => {
      res.status(200).send({ update });
    })
    .catch((err) => {
      next(err);
    });
};
