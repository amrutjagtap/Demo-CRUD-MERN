const { Op, where } = require("sequelize");
const db = require("../Models/index");
const EmployeeMaster = db.EmployeeMaster;
const DepartmentMaster = db.DepartmentMaster;
const JwtToken = require("./jwtToken.service");

// Create new employee
exports.createEmployee = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  try {
    const checkExist = await EmployeeMaster.findOne({
      where: { email: data.email },
    });

    if (checkExist == null) {
      const result = await EmployeeMaster.create(data);
      return "SAVED";
    } else {
      return "ALREADYEXISTS";
    }
  } catch (error) {
    console.error("Error creating department:", error);
    return "ERROR";
  }
};

// update employee
exports.updateEmployee = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  try {
    const employee = await EmployeeMaster.findOne({
      where: {
        id: {
          [Op.not]: data.id,
        },
        email: data.email,
      },
    });
    if (employee == null) {
      const result = await EmployeeMaster.update(data, {
        where: { id: data.id },
      });
      return "UPDATED";
    } else {
      return "ALREADYEXISTS";
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    return "ERROR";
  }
};

// check password
exports.checkPassword = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  try {
    const checkExist = await EmployeeMaster.findOne({
      where: { id: data.id, password: data.password },
    });

    if (checkExist !== null) {
      return "EXISTS";
    } else {
      return "INVALID";
    }
  } catch (error) {
    console.error("Error creating department:", error);
    return "ERROR";
  }
};

// change password
exports.changePassword = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  try {
    const employee = await EmployeeMaster.findOne({
      where: { id: data.id },
    });
    if (employee !== null) {
      const result = await EmployeeMaster.update(data, {
        where: { id: data.id },
      });
      return "UPDATED";
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    return "ERROR";
  }
};

// update multiple employee
exports.updateMultipleEmployee = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  try {
    for (const newData of data) {
      const result = await EmployeeMaster.update(newData, {
        where: { id: newData.id },
      });
    }
    return "UPDATED";
  } catch (error) {
    console.error("Error updating employee:", error);
    return "ERROR";
  }
};

// get emp by dept name with desc order
exports.getEmpDataWithDescOrder = async (data, header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  const employee = EmployeeMaster.findAll({
    include: [
      {
        model: DepartmentMaster,
        where: {
          id: data.id,
        },
      },
    ],
    order: [[`firstName`, "DESC"]],
  });
  return employee;
};

// get all emp data
exports.getAllEmpData = async (header) => {
  try {
    await JwtToken.verifyToken(header);
  } catch (error) {
    return "UNAUTHORIZED";
  }

  const employee = EmployeeMaster.findAll({
    include: [
      {
        model: DepartmentMaster,
      },
    ],
    where: { userType: "employee" },
  });
  return employee;
};

// get emp by id

// get all emp data
exports.getEmpDataById = async (header) => {
  try {
    const decode = await JwtToken.verifyToken(header);
    console.log("====================================");
    console.log(JSON.stringify(decode));

    const employee = await EmployeeMaster.findOne({
      include: [
        {
          model: DepartmentMaster,
        },
      ],
      where: { id: decode.userId },
    });
    return employee;
  } catch (error) {
    return "UNAUTHORIZED";
  }

  
};
