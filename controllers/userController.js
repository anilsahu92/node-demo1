const db = require("../dbConfig");
const { successRes, errorRes } = require("../helpers/respons");
const upload = require("../middlewares/fileUpload");

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DB Connected");
//   }
// });

//findOne
const findOne = async (data) => {
  let email = data;
  const sql = `SELECT * FROM users WHERE email=?`;
  //let getData = null;
  return new Promise(function (resolve, reject) {
    db.query(sql, email, (error, result, field) => {
      return error
        ? reject(error)
        : resolve(JSON.parse(JSON.stringify(result)));
    });
  });
};

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

  //cheking  email already exist
  findOne(body.email)
    .then((data) => {
      //console.log("dd", data.length)
      if (data.length == 0) {
        //not exist
        addNew();
      } else {
        res.status(201).json(successRes([], "Email id already Exist."));
      }
    })
    .catch((err) =>
      console.log((err) => {
        res
          .status(400)
          .json(errorRes([], err.sqlMessage || "Something went wrong."));
      })
    );
  //console.log(find);
  // res.send(find);
  // res.end();
  const addNew = () => {
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
  };
};

//Get All
const getAllUser = (req, res) => {
  //console.log(req.headers);

  console.log("Loggedin User", res?.userData);
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
        result.length > 0 ? "Data get successfully" : "data not found";
      res.status(200).json(successRes(result, message));
    }
  });
};

//Get By id
const updateUser = (req, res) => {
  const { fName, lName } = req.body;
  const { id } = req.params;
  sql = `UPDATE users SET f_name=?, l_name=?  WHERE id=${id}`;
  db.query(sql, [fName, lName], (error, result, field) => {
    if (error) {
      res.status(400).json(errorRes([], error.sqlMessage));
    } else {
      const message =
        result.affectedRows > 0
          ? "data updated successfully"
          : "User not found.";
      res.status(200).json(successRes([], message));
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

const userProfile = (req, res) => {
  upload(req, res, (err) => {
    console.log(req.file);
    // if (err instanceof multer.MulterError) {
    //   console.log("upload", err);
    //   res.send(err);
    // } else if (err) {
    //   console.log("upload 2", err);
    //   res.send(err);
    // }

    if (!req.file) {
      console.log("upload 1", req.file);
      res
        .status(201)
        .json(
          errorRes(
            [],
            req.fileValidationError || "Please select png,jpg file under 1mb."
          )
        );
    } else {
      res.status(200).json(successRes([], "upload Successfully"));
    }
  });
};

module.exports = {
  addUser,
  getAllUser,
  getUserById,
  deleteUser,
  updateUser,
  userProfile,
};
