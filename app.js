// DEPENDANCIES

const inquirer = require("inquirer");
const connection = require("./db/connection");
const figlet = require("figlet");
const db = require("./db/queries");
const util = require("util");
const queries = require("./db/queries");
connection.query = util.promisify(connection.query);


const runApp = () => {
    // Figlet
    figlet("Welcome to the Employee Tracker App!", function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      // Display
      console.log(`${data}\n`);
      // init();
      startMenu();
    });
  };
  runApp();

// INQUIRER

function startMenu () {
    inquirer.prompt({
        message: "What would you like to do?",
        type: "list",
        name: "selection",
        choices: [ 
        "View Employees",
        "View Departments",
        "View Roles", 
        new inquirer.Separator(),
        "Add Employee",
        "Add Department",
        "Add Role",
        new inquirer.Separator(),
        "Update Employee Role",
        "Update Employee Manager",
        new inquirer.Separator(),
        "Remove Employee",
        "Remove Department",
        "Remove Role",
        new inquirer.Separator(),
        "Exit",
        new inquirer.Separator(),
    ],
})
.then(function (answer) {
    if (answer.selection === "View Employees") {viewEmployees();
    // } else if (answer.selection === "View Employees by Manager") {viewEmployeesByManager();
    // } else if (answer.selection === "View Employees by Department") {viewEmployeesByDepartment();
    } else if (answer.selection === "View Departments") {viewDepartments();
    } else if (answer.selection === "View Roles") {viewRoles();
    } else if (answer.selection === "Add Employee") {addEmployee();
    } else if (answer.selection === "Add Department") {addDepartment();
    } else if (answer.selection === "Add Role") {addRole();
    } else if (answer.selection === "Update Employee Role") {updateEmployeeRole();
    // } else if (answer.selection === "Update Employee Manager") {updateEmployeeManager();
    // } else if (answer.selection === "Remove Employee") {deleteEmployee();
    // } else if (answer.selection === "Remove Department") {deleteDepartment();
    // } else if (answer.selecticlon === "Remove Role") {deleteRole();
    } else {connection.end();
    }
})

}