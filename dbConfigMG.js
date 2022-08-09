const mongoose = require("mongoose");

const coonnectDB = async () => {
  //console.log(process.env.MONGO_URL);
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log("mongodb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

module.exports = coonnectDB;
