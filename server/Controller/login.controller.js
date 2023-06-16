const Login = require("../Services/login.service");

// check login
exports.checkLogin = async (req, res) => {
  const result = await Login.checkLogin(req.body);
  res.status(200).send(result);
};

// check login
exports.getDataByToken = async (req, res) => {
  const result = await Login.getDataByToken(req.headers);
  res.status(200).send(result);
};
