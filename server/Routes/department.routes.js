module.exports = (app) => {
  const deptMaster = require("../Controller/department.controller");

  var router = require("express").Router();

  //Create New Department
  router.post("/create", deptMaster.createDepartment);

  //   Update Department
  router.put("/update", deptMaster.updateDepartment);

  //   Check Department Exist
  router.get("/check-exist/:deptName", deptMaster.checkDeptExist);

  //   get all Department
  router.get("/get-all-dept", deptMaster.getAllDept);

  //   delete department
  router.delete("/delete/:id", deptMaster.deleteDept);

  //   get emp by dept and loc
  router.post(
    "/get-employee-by-dept-and-loc",
    deptMaster.getEmpByDeptNameAndLoc
  );

  app.use("/ipangram/department", router);
};
