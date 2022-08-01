const mySql = require("mysql");
const dbConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "node-demo1",
};
const db = mySql.createConnection(dbConfig);

// db.connect((err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log("DB Connected");
//   }
// });

module.exports = db;
