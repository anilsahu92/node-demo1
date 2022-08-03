const db = require("../dbConfig");
const { successRes, errorRes } = require("../helpers/respons");
const upload = require("../middlewares/fileUpload");
var jwt = require("jsonwebtoken");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

//login
const login = (req, res) => {
  const { email, password } = req.body;
  //console.log("key", process.env.PRIVATE_KEY);

  sql = "SELECT * FROM users WHERE email=? AND password=?";
  db.query(sql, [email, password], (error, result, field) => {
    if (error) {
      //console.log(error);
      res.status(400).json(errorRes([], error.sqlMessage));
      //return error.sqlMessage;
    } else {
      //return result;
      if (result.length > 0) {
        const token = jwt.sign({ ...result[0] }, PRIVATE_KEY, {
          expiresIn: "1h",
        });

        res
          .status(400)
          .json(successRes([{ token: token }], "Login Successfully."));
      } else {
        res.status(400).json(errorRes([], "Credencials not match."));
      }
    }
  });

  //   res.send("ok");
};

module.exports = {
  login,
};
