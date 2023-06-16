module.exports = (app) => {
  const empMaster = require("../Controller/employee.controller");

  var router = require("express").Router();

  // getEmpDataWithDescOrder and department id
  router.get("/get-all-emp", empMaster.getAllEmpData);

  //Create New employee
  router.post("/create", empMaster.createEmployee);

  //   Update employee
  router.put("/update", empMaster.updateEmployee);

  //   Check password Exist
  router.post("/check-password-exist", empMaster.checkPassword);

  //   Change password
  router.post("/change-password", empMaster.changePassword);

  //   Update employee
  router.put("/update-muli-emp", empMaster.uypdateMultipleEmp);

  //   // getEmpDataWithDescOrder and department id
  router.post("/get-emp-desc-order", empMaster.getEmpDataWithDescOrder);

  //   // get emp by id
  router.get("/get-emp-by-id", empMaster.getEmpDataById);

  // //   delete employee
  // router.delete("/delete/:id", empMaster.deleteDept);

  app.use("/ipangram/employee", router);
};
