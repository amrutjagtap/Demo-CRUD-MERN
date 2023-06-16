module.exports = (app) => {
  const empMaster = require("../Controller/login.controller");

  var router = require("express").Router();

  //check login
  router.post("/check", empMaster.checkLogin);

  //get data by token
  router.get("/get-data-by-token", empMaster.getDataByToken);

  app.use("/ipangram/login", router);
};
