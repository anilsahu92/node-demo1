const db = require("../dbConfig");
const { successRes, errorRes } = require("../helpers/respons");

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DB Connected");
//   }
// });

//Add
const addUser = (req, res) => {
  //const { fName, lName, email, password } = req.body;
  //sql = "INSERT INTO users (f_name,l_name,email,password) VALUES (?,?,?,?)";
  const body = req.body;
  console.log(body);
  const reqData = {
    f_name: body?.fName,
    l_name: body?.lName,
    email: body?.email,
    password: body?.password,
  };
  sql = `INSERT INTO users SET ?`;
  db.query(sql, [reqData], (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      const message = result.insertId
        ? "data added successfully"
        : result.sqlMessage;
      const data = result.insertId ? { insertId: result.insertId } : result;
      res.status(200).json(successRes(data, message));
    }
  });

  //   res.send("ok");
};

//Get All
const getAllUser = (req, res) => {
  sql = "SELECT * FROM users";
  db.query(sql, (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      res.status(200).json(successRes(result, "data get successfully"));
    }
  });
};

//Get By id
const getUserById = (req, res) => {
  const id = req.params.id;
  sql = "SELECT * FROM users WHERE id=?";
  db.query(sql, id, (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      const message =
        result.length > 0 ? "data get successfully" : "data not found";
      res.status(200).json(successRes(result, message));
    }
  });
};

//Get By id
const updateUser = (req, res) => {
  const { id, fName, lName } = req.body;
  sql = `UPDATE users SET f_name=?, l_name=?  WHERE id=${id}`;
  db.query(sql, [fName, lName], (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      const message =
        result.affectedRows > 0
          ? "data updated successfully"
          : "User not found.";
      res.status(200).json(successRes(result, message));
    }
  });
  console.log(req.body);
};

//Get By id
const deleteUser = (req, res) => {
  const id = req.params.id;
  sql = "DELETE FROM users WHERE id=?";
  db.query(sql, id, (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      const message = result.affectedRows
        ? "data added successfully"
        : "User not exist.";
      res.status(200).json(successRes([], message));
    }
  });
};

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
};
