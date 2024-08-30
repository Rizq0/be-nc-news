const apiRouter = require("express").Router();
const {
  topicRouter,
  articlesRouter,
  usersRouter,
  commentsRouter,
} = require("./subrouters/subrouter-index");
const { getApiEndpoints } = require("../controllers/api-controllers");

apiRouter.get("/", getApiEndpoints);

apiRouter.use("/topics", topicRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/users", usersRouter);
apiRouter.use("/comments", commentsRouter);

module.exports = apiRouter;
