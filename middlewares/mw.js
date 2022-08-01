var mw = (req, res, next) => {
  console.log("mw called");
  if (req.query.id == "2") {
    res.send("page not found.");
  } else {
    next();
  }
};

module.exports = mw;
