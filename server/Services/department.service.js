const { Op, where } = require("sequelize");
const db = require("../Models/index");
const DepartmentMaster = db.DepartmentMaster;
const EmployeeMaster = db.EmployeeMaster;
const JwtToken = require("./jwtToken.service");

// id, departmentName, categoryName, location, salary, createdAt, updatedAt
// Create new  department
exports.createDepartment = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }
  try {
    const result = await DepartmentMaster.create(data);

    return "SAVED";
  } catch (error) {
    console.error("Error creating department:", error);
    return "ERROR";
  }
};

// update dept
exports.updateDepartment = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }
  try {
    const result = await DepartmentMaster.update(data, {
      where: { id: data.id },
    });

    return "UPDATED";
  } catch (error) {
    console.error("Error updating department:", error);
    return "ERROR";
  }
};

// check department alresdy exist
exports.checkDeptExist = async (deptNm, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }
  let dept = await DepartmentMaster.findOne({
    where: { departmentName: deptNm },
  });
  if (dept === null) {
    return "NOTFOUND";
  } else {
    return "ALREADYEXIST";
  }
};

// get all dept
exports.getAllDept = async (header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }
  let result = await DepartmentMaster.findAll({ raw: true });
  return result;
};

// Delete Department
exports.deleteDept = async (id, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }
  let result = await DepartmentMaster.destroy({
    where: { id: id },
  });
  return "DELETED";
};

// get emp by deptname and location
exports.getEmpByDeptNameAndLoc = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  const employee = EmployeeMaster.findAll({
    attributes: [
      "id",
      "firstName",
      "lastName",
      "gender",
      "hobbies",
      "email",
      "userType",
      "departmentId",
    ],
    include: [
      {
        model: DepartmentMaster,
        where: {
          id: data.id,
          location: {
            [Op.like]: `${data.location}%`,
          },
        },
      },
    ],
  });

  return employee;
};
