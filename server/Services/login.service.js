const { Op } = require("sequelize");
const db = require("../Models/index");
const EmployeeMaster = db.EmployeeMaster;
const JwtToken = require("./jwtToken.service");

exports.checkLogin = async (data) => {
  try {
    const checkExist = await EmployeeMaster.findOne({
      where: { [Op.and]: [{ email: data.email }, { password: data.password }] },
    });
    if (checkExist) {
      const jwtObj = { id: checkExist.id, email: checkExist.email };
      const token = await JwtToken.createToken(jwtObj);
      const name = checkExist.firstName + " " + checkExist.lastName;
      const user = {
        id: checkExist.id,
        name: name,
        email: checkExist.email,
        userType: checkExist.userType,
        token: token,
      };

      return user;
    } else {
      return "NOTFOUND";
    }
  } catch (error) {
    console.error("Error creating department:", error);
    return "ERROR";
  }
};

exports.getDataByToken = async (headers) => {
  const decoded = await JwtToken.verifyToken(headers);
  console.log("stringyfy =======" + JSON.stringify(decoded));

  const employee = await EmployeeMaster.findOne({
    where: { id: decoded.userId },
  });
  const name = employee.firstName + " " + employee.lastName;
  const user = {
    id: employee.id,
    name: name,
    email: employee.email,
    userType: employee.userType,
    token: headers.token,
  };
  return user;
};
