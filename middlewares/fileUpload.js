const multer = require("multer");
const uniqid = require("uniqid");
const path = require("path");
//const upload = multer({ dest: "./uploads/" });

let upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `./uploads`);
    },
    filename: function (req, file, cb) {
      //cb(null, uniqid() + path.extname(file.originalname));
      cb(null, Date.now() + "_" + file.originalname);
    },
  }),
  fileFilter: function (req, file, cb) {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To reject this file pass `false`, like so:
    //console.log("file", file);
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      req.fileValidationError = "Only jpg, png, jpeg file accepted.";
      return cb(null, false, new Error("Only jpg, png, jpeg file accepted."));
    }
  },
  limits: { fileSize: 1024 * 1024 * 1 }, //1mb
}).single("file");

module.exports = upload;
