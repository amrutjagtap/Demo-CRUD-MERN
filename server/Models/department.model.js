const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const DepartmentMaster = sequelize.define(
    "department_master",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      departmentName: { type: DataTypes.STRING, allowNull: false },
      categoryName: { type: DataTypes.STRING, allowNull: false },
      location: { type: DataTypes.STRING, allowNull: false },
      salary: { type: DataTypes.FLOAT, allowNull: false },
    },
    {
      tableName: "department_master",
    }
  );

  return DepartmentMaster;
};
