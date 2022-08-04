const successRes = (data, message, code = 200) => {
  return {
    code: code,
    status: "Success",
    data: data,
    message: message,
  };
};
const errorRes = (data, message, code = 400) => {
  return {
    code: code,
    status: "Error",
    data: data,
    message: message,
  };
};
const authError = (data, message, code = 401) => {
  return {
    code: code,
    status: "Error",
    data: data,
    message: message,
  };
};
module.exports = {
  successRes,
  errorRes,
  authError,
};
