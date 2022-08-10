const mongoose = require("mongoose");
const db = require("../dbConfig");

const { successRes, errorRes } = require("../helpers/respons");
const upload = require("../middlewares/fileUpload");
const userSchema = require("../modals/userModal");

require("dotenv").config();

//Add
const addUser = async (req, res) => {
  const body = req.body;
  console.log(body);
  const addNew = new userSchema({
    //_id: new mongoose.Schema.Types.ObjectId(),
    f_name: body?.fName,
    l_name: body?.lName,
    email: body?.email,
    password: body?.password,
  });

  // addNew
  //   .save()
  //   .then((doc) => {
  //     res.status(200).json(successRes([doc], "Data get successfully"));
  //   })
  //   .catch((err) => {
  //     res
  //       .status(400)
  //       .json(errorRes(err, err.message || "Something went wrong."));
  //   });

  const check = await userSchema.findOne({ email: body?.email });
  console.log(check);
  if (!check) {
    addNew
      .save()
      .then((doc) => {
        res.status(200).json(successRes([doc], "Data get successfully"));
      })
      .catch((err) => {
        res
          .status(400)
          .json(errorRes(err, err.message || "Something went wrong."));
      });
  } else {
    res.status(400).json(errorRes([], "Email alreay exist."));
  }
};

//Get All
const getAllUser = async (req, res) => {
  //console.log(req.headers);
  //console.log("Loggedin User", res?.userData);
  userSchema.find({}, { f_name: 1, l_name: 1, email: 1 }, (err, doc) => {
    if (doc) {
      res.status(200).json(successRes(doc, "data get successfully"));
    } else {
      res.status(400).json(errorRes(err, "Something went wrong."));
    }
  });
};

//Get By id
const getUserById = async (req, res) => {
  const id = req.params.id;
  userSchema.find({ _id: id }, (err, doc) => {
    if (doc) {
      res.status(200).json(successRes(doc, "data get successfully"));
    } else {
      res.status(400).json(errorRes([], "Data not found."));
    }
  });
};

//Update User
const updateUser = (req, res) => {
  const { fName, lName } = req.body;
  const { id } = req.params;

  userSchema.updateOne(
    { _id: id },
    {
      $set: {
        f_name: fName,
        l_name: lName,
      },
    },
    (err, doc) => {
      if (doc) {
        res.status(200).json(successRes([], "Data Updated successfully"));
      } else {
        res.status(400).json(errorRes([], "Data not found."));
      }
    }
  );
};

//Delete By id
const deleteUser = (req, res) => {
  const id = req.params.id;

  userSchema.deleteOne({ _id: id }, (err, doc) => {
    if (doc) {
      res.status(200).json(successRes([], "Data Deleted successfully"));
    } else {
      res.status(400).json(errorRes([], "Data not found."));
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
