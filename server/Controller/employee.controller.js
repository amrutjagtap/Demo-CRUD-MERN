const EmployeeMaster = require("../Services/employee.service");

// Create employee
exports.createEmployee = async (req, res) => {
  const result = await EmployeeMaster.createEmployee(req.body, req.headers);
  res.status(200).send(result);
};

// Update employee
exports.updateEmployee = async (req, res) => {
  const result = await EmployeeMaster.updateEmployee(req.body, req.headers);
  res.status(200).send(result);
};

// check old password
exports.checkPassword = async (req, res) => {
  const result = await EmployeeMaster.checkPassword(req.body, req.headers);
  res.status(200).send(result);
};

// change  password
exports.changePassword = async (req, res) => {
  const result = await EmployeeMaster.changePassword(req.body, req.headers);
  res.status(200).send(result);
};

// multiple update employee
exports.uypdateMultipleEmp = async (req, res) => {
  const result = await EmployeeMaster.updateMultipleEmployee(
    req.body,
    req.headers
  );
  res.status(200).send(result);
};

// getEmpDataWithDescOrder and department id
exports.getEmpDataWithDescOrder = async (req, res) => {
  const result = await EmployeeMaster.getEmpDataWithDescOrder(
    req.body,
    req.headers
  );
  res.status(200).send(result);
};

// getEmpDataWithDescOrder and department id
exports.getAllEmpData = async (req, res) => {
  const result = await EmployeeMaster.getAllEmpData(req.headers);
  res.status(200).send(result);
};

// get emp by id
exports.getEmpDataById = async (req, res) => {
  const result = await EmployeeMaster.getEmpDataById(req.headers);
  res.status(200).send(result);
};
