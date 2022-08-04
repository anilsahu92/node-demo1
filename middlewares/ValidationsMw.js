const Joi = require("joi");
const { errorRes } = require("../helpers/respons");

//add User
var addUservalidation = async (req, res, next) => {
  const schema = Joi.object()
    .keys({
      fName: Joi.string().required().label("First name"),
      lName: Joi.string().allow(null).allow("").optional().label("Last name"),
      email: Joi.string().email().required().label("Email"),
      password: Joi.string().min(4).required().label("Passeord"),
      //   cPassword: Joi.string()
      //     .valid(Joi.ref("password"))
      //     .error(new Error("Confirm Password not match.")),
    })
    .unknown(true);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log("error", error);
    res.status(201).json(errorRes([], error.message));
  } else {
    next();
  }
};

//update User
var updateUserValidation = async (req, res, next) => {
  const schema = Joi.object()
    .keys({
      fName: Joi.string().required().label("First name"),
      lName: Joi.string().allow(null).allow("").optional().label("Last name"),
    })
    .unknown(true);

  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    console.log("error", error);
    res.status(201).json(errorRes([], error.message));
  } else {
    next();
  }
};

module.exports = {
  addUservalidation,
  updateUserValidation,
};
