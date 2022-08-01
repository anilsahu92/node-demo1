const express = require("express");
const mw = require("./../middlewares/mw");
var router = express.Router();

router.get("/", (req, res) => {
  res.send("get all");
});
router.get("/:id(\\d+)", (req, res) => {
  const id = req.params.id;
  res.send("get by id " + id);
});
router.get("/:id/:ur", (req, res) => {
  const id = req.params.id;
  res.send("get by id " + id + " and url  " + req.params.ur);
});

router.get("/qry", mw, (req, res) => {
  const qry = req.query;
  res.send("query by id " + qry.id);
});

module.exports = router;
