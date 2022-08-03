const express = require("express");
const app = express();
const userRouter = require("./routers/users");
const authRouter = require("./routers/auth");

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = 3300;
const base = "/api";

app.get(base, (req, res) => {
  res.send("welcome");
});

app.use(base + "/user", userRouter);
app.use(base + "/auth", authRouter);

app.listen(port, () => {
  console.log("server running on port", "http://localhost:" + port);
});
