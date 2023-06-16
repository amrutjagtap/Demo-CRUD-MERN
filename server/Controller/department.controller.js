const DepartmentMaster = require("../Services/department.service");

// Create Department
exports.createDepartment = async (req, res) => {
  const result = await DepartmentMaster.createDepartment(req.body, req.headers);
  res.status(200).send(result);
};

// update Department
exports.updateDepartment = async (req, res) => {
  const result = await DepartmentMaster.updateDepartment(req.body, req.headers);
  res.status(200).send(result);
};

// check Department already exist
exports.checkDeptExist = async (req, res) => {
  const result = await DepartmentMaster.checkDeptExist(
    req.params.deptName,
    req.headers
  );
  res.status(200).send(result);
};

// Get all Dept
exports.getAllDept = async (req, res) => {
  const result = await DepartmentMaster.getAllDept(req.headers);
  res.status(200).send(result);
};

// Delete department
exports.deleteDept = async (req, res) => {
  const result = await DepartmentMaster.deleteDept(req.params.id, req.headers);
  res.status(200).send(result);
};

exports.getEmpByDeptNameAndLoc = async (req, res) => {
  const result = await DepartmentMaster.getEmpByDeptNameAndLoc(
    req.body,
    req.headers
  );
  res.status(200).send(result);
};
