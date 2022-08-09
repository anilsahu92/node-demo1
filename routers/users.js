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
const {
  addUservalidation,
  updateUserValidation,
} = require("../middlewares/ValidationsMw");

var userRouter = express.Router();

userRouter.get("/", getAllUser);
//userRouter.get("/:id(\\d+)", getUserById);
userRouter.get("/:id", getUserById);
userRouter.delete("/:id", deleteUser);
userRouter.post("/add", addUservalidation, addUser);
userRouter.put("/:id", updateUserValidation, updateUser);
userRouter.post("/profile_upload", userProfile);

module.exports = userRouter;
