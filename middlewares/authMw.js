var jwt = require("jsonwebtoken");
const { authError } = require("../helpers/respons");
require("dotenv").config();
const PRIVATE_KEY = process.env.PRIVATE_KEY;

var authMw = (req, res, next) => {
  if (req.headers.authorization) {
    const auth = req.headers.authorization;
    const token = auth.split(" ")[1];
    //console.log(token);

    jwt.verify(token, PRIVATE_KEY, (err, decoded) => {
      if (err) {
        console.log(err);
        res.status(401).json(authError([], "Authentication Error."));
      } else {
        //console.log(decoded);
        //res.userData = decoded;  //use to pass decoded JWT key login user data
        next();
      }
    });
  } else {
    res.status(401).json(authError([], "Authentication Error."));
  }
};

module.exports = authMw;
