const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    f_name: { type: String, required: [true, "First name required."] },
    l_name: String,
    email: { type: String, required: [true, "Email required."], unique: true },
    password: { type: String, required: [true, "Password required."] },
  },
  { timestamp: true }
);

let users = mongoose.model("users", userSchema);

module.exports = users;
