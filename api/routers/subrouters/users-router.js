const {
  getAllUsers,
  getUserByUsername,
} = require("../../controllers/user-controllers");
const usersRouter = require("express").Router();

usersRouter.get("/", getAllUsers);
usersRouter.get("/:username", getUserByUsername);

module.exports = usersRouter;
