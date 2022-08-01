const express = require("express");
const mw = require("./../middlewares/mw");
const {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

var userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id(\\d+)", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.post("/add", addUser);
userRouter.put("/", updateUser);

module.exports = userRouter;
