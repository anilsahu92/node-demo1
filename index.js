const express = require("express");
const app = express();
const userRouter = require("./routers/users");
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

const port = 3300;

app.get("/", (req, res) => {
  res.send("welcome");
});

app.use("/user", userRouter);

app.listen(port, () => {
  console.log("server running on port", "http://localhost:" + port);
});
