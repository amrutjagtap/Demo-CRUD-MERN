module.exports = {
  HOST: "localhost",

  USER: "root",

  PASSWORD: "root123",

  DB: "ipangram_task",

  dialect: "mysql",
  timezone: "+05:30",

  pool: {
    max: 5,

    min: 0,

    acquire: 30000,

    idle: 10000,
  },
};
