const dbConfig = require("../Config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  // operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
  timezone: dbConfig.timezone,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.EmployeeMaster = require("./employee.model")(sequelize, Sequelize);
db.DepartmentMaster = require("./department.model")(sequelize, Sequelize);

db.EmployeeMaster.belongsTo(db.DepartmentMaster, {
  foreignKey: "departmentId",
});
db.DepartmentMaster.hasMany(db.EmployeeMaster, { foreignKey: "departmentId" });

module.exports = db;
