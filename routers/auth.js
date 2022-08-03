const express = require("express");
const mw = require("./../middlewares/mw");
const upload = require("./../middlewares/fileUpload");
const { login } = require("../controllers/authController");

var router = express.Router();

router.post("/login", login);
// userRouter.get("/:id(\\d+)", getUserById);
// userRouter.delete("/:id", deleteUser);
// userRouter.post("/add", addUser);
// userRouter.put("/", updateUser);
// userRouter.post("/profile_upload", userProfile);

module.exports = router;
