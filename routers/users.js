const express = require("express");
const mw = require("./../middlewares/mw");
const upload = require("./../middlewares/fileUpload");
const {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  userProfile,
} = require("../controllers/userController");

var userRouter = express.Router();

userRouter.get("/", getAllUser);
userRouter.get("/:id(\\d+)", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.post("/add", addUser);
userRouter.put("/", updateUser);
userRouter.post("/profile_upload", userProfile);

module.exports = userRouter;
