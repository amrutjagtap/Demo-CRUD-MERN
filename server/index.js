const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./Models/index");

const app = express();

var corsOptions = {
  origin: "http://localhost:8080",
};

app.use(cors());

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Server Database Sync
db.sequelize.sync().then(() => {
  console.log("Database synced");
  createDefaultManager();
});

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome" });
});

// Routes
require("./Routes/department.routes")(app);
require("./Routes/employee.routes")(app);
require("./Routes/login.routes")(app);

// Set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Function to create default manager account if it doesn't exist
// id, firstName, lastName, gender, hobbies, email, password, userType, createdAt, updatedAt, departmentId
async function createDefaultManager() {
  try {
    const manager = await db.EmployeeMaster.findOne({
      where: { userType: "manager" },
    });

    if (!manager) {
      await db.EmployeeMaster.create({
        id:1,
        firstName: "Amrut",
        lastName: "Jagtap",
        gender: "Male",
        hobbies: "Reading, Singing, Playing Guiter",
        email: "amrut@email.com",
        password: "manager@123",
        userType: "manager",
      });

      console.log("Default manager account created");
    } else {
      console.log("Default manager account already exists");
    }
  } catch (error) {
    console.error("Error creating default manager account:", error);
  }
}

// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const db = require("./Models/index");

// const app = express();

// var corsOptions = {
//   origin: "http://localhost:8080",
// };

// app.use(cors());

// // parse requests of content-type - application/json
// app.use(bodyParser.json());

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));

// // Server Database Sync
// db.sequelize.sync();

// // simple route
// app.get("/", (req, res) => {
//   res.json({ message: "Welcome" });
// });

// // require('./Routes/member.routes')(app)

// require("./Routes/fees.routes")(app);

// // set port, listen for requests
// const PORT = process.env.PORT || 8080;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`);
// });
