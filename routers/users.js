const express = require("express");
//const mw = require("./../middlewares/mw");
//const upload = require("./../middlewares/fileUpload");
const {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  userProfile,
} = require("../controllers/userController");
const authMw = require("../middlewares/authMw");

var userRouter = express.Router();

userRouter.get("/", authMw, getAllUser);
userRouter.get("/:id(\\d+)", authMw, getUserById);
userRouter.delete("/:id", authMw, deleteUser);
userRouter.post("/add", authMw, addUser);
userRouter.put("/", authMw, updateUser);
userRouter.post("/profile_upload", authMw, userProfile);

module.exports = userRouter;
