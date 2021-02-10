// DEPENDANCIES

const inquirer = require("inquirer");
const connection = require("./db/connection");
const figlet = require("figlet");
const db = require("./db/queries");
const util = require("util");
connection.query = util.promisify(connection.query);

//  Figlet welcome message

const runApp = () => {
  
  figlet("Welcome to the\nEmployee Tracker!", function (err, data) {
    if (err) {
      console.log("Something went wrong...");
      console.dir(err);
      return;
    }
    // Display the art
    console.log(`${data}\n`);
    // init();
    startMenu();
  });
};

runApp();

// INQUIRER


function startMenu() {
  inquirer
    .prompt({
      name: "userAction",
      type: "list",
      message: "What would you like to do?",
      choices: [
        new inquirer.Separator(),
        "Add Employee",
        "Add Department",
        "Add Role",
        // bonus, working on it
        // "View Employees by Manager",
        // "View Employees by Department",
        "View Employees",
        "View Departments",
        "View Roles",
        new inquirer.Separator(),
        "Update Employee Role",
        // bonus, working on it
        // "Update Employee Manager",
        // bonus, working on it
        // new inquirer.Separator(),
        // "Delete Employee",
        // "Delete Department",
        // "Delete Role",
        new inquirer.Separator(),
        "Exit",
        new inquirer.Separator(),
      ],
    })

    .then(function (answer) {
      if (answer.userAction === "View Employees") {
        viewEmployees();
      } else if (answer.userAction === "View Employees by Manager") {
        viewEmployeesByManager();
      } else if (answer.userAction === "View Employees by Department") {
        viewEmployeesByDepartment();
      } else if (answer.userAction === "View Departments") {
        viewDepartments();
      } else if (answer.userAction === "View Roles") {
        viewRoles();
      } else if (answer.userAction === "Add Employee") {
        addEmployee();
      } else if (answer.userAction === "Add Department") {
        addDepartment();
      } else if (answer.userAction === "Add Role") {
        addRole();
      } else if (answer.userAction === "Update Employee Role") {
        updateEmployeeRole();
      } else if (answer.userAction === "Update Employee Manager") {
        updateEmployeeManager();
      } else if (answer.userAction === "Remove Employee") {
        deleteEmployee();
      } else if (answer.userAction === "Remove Department") {
        deleteDepartment();
      } else if (answer.userAction === "Remove Role") {
        deleteRole();
      } else {
        connection.end();
      }
    });
}

// View Employees

async function viewEmployees() {
  const employees = await db.viewAllEmployees();
  console.table(employees);
  startMenu();
}

// View Departments

async function viewDepartments() {
  const departments = await db.viewDepartments();
  console.table(departments);
  startMenu();
}

// View Roles

async function viewRoles() {
  const roles = await db.viewRoles();
  console.table(roles);
  startMenu();
}

// Add Employee

async function addEmployee() {

  // ask user questions

  let newEmployeeFirstName;
  let newEmployeeLastName;

  await inquirer
    .prompt([
      {
        message: "Enter the employee's first name?",
        name: "addEmployeeFirstName",
        validate: function validateFirstName(name) {
          return name !== "";
        },
        type: "input",
      },
      {
        message: "Enter the employee's last name?",
        name: "addEmployeeLastName",
        validate: function validateLastName(name) {
          return name !== "";
        },
        type: "input",
      },
    ])
    .then(function (answer) {
      console.log(answer);
      newEmployeeFirstName = answer.addEmployeeFirstName;
      newEmployeeLastName = answer.addEmployeeLastName;
    });

  // role choices

  let newEmployeeRoleAnswer;
  const newEmployeeRoles = await db.viewRoles(
    newEmployeeFirstName,
    newEmployeeLastName
  );
  const roleChoices = newEmployeeRoles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }));

  await inquirer
    .prompt({
      type: "rawlist",
      name: "newEmployeeRoleQuestion",
      message: "What role would you like to add?",
      choices: roleChoices,
    })
    .then(function (answer1) {
      newEmployeeRoleAnswer = answer1.newEmployeeRoleQuestion;
    });

  // manager choices

  let id = 0;
  let newEmployeeManagerAnswer;
  const newEmployeeManagers = await db.viewAllManagers(id);

  // then create a new array of all the managers to seperate them out for the prompt

  const managerChoices = newEmployeeManagers.map(
    ({ id, first_name, last_name }) => ({
      name: `${first_name} ${last_name}`,
      value: id,
    })
  );

  await inquirer
    .prompt({
      type: "rawlist",
      name: "newEmployeeManagerQuestion",
      message: `Choose a manager for the new employee:`,
      choices: managerChoices,
    })
    .then(function (answer2) {
      newEmployeeManagerAnswer = answer2.newEmployeeManagerQuestion;
    });

  // call the db.addEmployee()

  await db.addEmployee(
    newEmployeeFirstName,
    newEmployeeLastName,
    newEmployeeRoleAnswer,
    newEmployeeManagerAnswer
  );

  console.log(
    `Congrats! you just added ${newEmployeeFirstName}` +
      " " +
      `${newEmployeeLastName} as a new employee`
  );

  startMenu();
}

// Add Departments

async function addDepartment() {
  let newDepartment;
  await inquirer
    .prompt({
      message: "What is the new department would you like to add?",
      name: "addDepartment",
      validate: function validateDepartmentName(name) {
        return name != "";
      },
      type: "input",
    })
    .then(function (newDepartmentAnswer) {
      newDepartment = newDepartmentAnswer.addDepartment;
    });

  await db.addDepartment(newDepartment);
  console.log(`You've just added the ${newDepartment}`);
  startMenu();
}

// Add Roles

async function addRole() {
  await inquirer
    .prompt([
      {
        message: "What is the new role would you like to add?",
        name: "addRoleTitle",
        validate: function validateRole(name) {
          return name != "";
        },
        type: "input",
      },
      {
        message: "Enter the salary for the new role?",
        name: "addRoleSalary",
        validate: function validateRole(name) {
          return name != NaN;
        },
        type: "input",
      },
      {
        message:
          "Enter the department code of the new role?",
        name: "addRoleDepartmentId",
        validate: function validateRole(name) {
          return name != NaN;
        },
        type: "input",
      },
    ])
    .then(function (newRoleAnswer) {
      newRoleTitle = newRoleAnswer.addRoleTitle;
      newRoleSalary = newRoleAnswer.addRoleSalary;
      newRoleDepartmentId = newRoleAnswer.addRoleDepartmentId;
    });

  await db.addRole(newRoleTitle, newRoleSalary, newRoleDepartmentId);
  console.log(`You have just added the ${newRoleTitle}`);
  startMenu();
}

// Delete Employee

async function deleteEmployee() {
  // first need to see employees - awaits database response
  const employees = await db.viewAllEmployees();
  // then create a new array of all the employees to seperate them out for the prompt
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  // prompt user to choose which employee they would like to delete
  await inquirer
    .prompt({
      type: "rawlist",
      name: "deleteEmployee",
      message: "Which Employee would you like to delete?",
      choices: employeeChoices,
    })

    .then(function (res) {
      employeeChoice = res.deleteEmployee;
    });

  await db.deleteEmployee(employeeChoice);
  console.log(`The employee was fired!`);
  startMenu();
}

// Delete Department

async function deleteDepartment() {
  // first need to see departments - awaits database response
  const departments = await db.viewDepartments();
  // then create a new array of all the employees to seperate them out for the prompt
  const departmentChoices = departments.map(({ id, name }) => ({
    name: `${name}`,
    value: id,
  }));

  // prompt user to choose which employee they would like to delete
  await inquirer
    .prompt({
      type: "rawlist",
      name: "deleteDepartment",
      message: "Which department would you like to delete?",
      choices: departmentChoices,
    })

    .then(function (res) {
      departmentChoice = res.deleteDepartment;
    });

  await db.deleteDepartment(departmentChoice);
  console.log(`You just deleted a department!`);
  startMenu();
}

// Delete Role
async function deleteRole() {
  // first need to see departments - awaits database response
  const roles = await db.viewRoles();
  // then create a new array of all the employees to seperate them out for the prompt
  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }));

  // prompt user to choose which employee they would like to delete
  await inquirer
    .prompt({
      type: "rawlist",
      name: "deleteRole",
      message: "Which role would you like to delete?",
      choices: roleChoices,
    })

    .then(function (res) {
      roleChoice = res.deleteRole;
    });

  await db.deleteRole(roleChoice);
  console.log(`You deleted a role!`);
  startMenu();
}


// update employee roles

async function updateEmployeeRole() {
  // first need to see employees - awaits database response
  const employees = await db.viewAllEmployees();
  // then create a new array of all the employees to seperate them out for the prompt
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));

  // prompt user to choose which employee's role they would like to update
  await inquirer
    .prompt({
      type: "rawlist",
      name: "updateEmployeeRole",
      message: "Which Employee's role would you like to update?",
      choices: employeeChoices,
    })

    .then(function (res) {
      employeeChoice = res.updateEmployeeRole;
    });

  const roles = await db.viewRoles();
  const roleChoices = roles.map(({ id, title }) => ({
    name: `${title}`,
    value: id,
  }));

  await inquirer
    .prompt({
      type: "rawlist",
      name: "newEmployeeRole",
      message: "Which new role would you like to give ?",
      choices: roleChoices,
    })
    .then(function (res2) {
      newEmployeeRoleChoice = res2.newEmployeeRole;
    });

  await db.updateEmployeeRole(newEmployeeRoleChoice, employeeChoice);
  console.log(`You've succesfully updated this employee's role`);
  startMenu();
}

async function updateEmployeeManager() {
  // first need to see employees - awaits database response
  const employees = await db.viewAllEmployees();
  // then create a new array of all the employees to seperate them out for the prompt
  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id,
  }));
  // variables used later
  let employeeId;
  let managerId;
  // watiing for user to give a response
  await inquirer
    .prompt({
      type: "rawlist",
      name: "updateEmployeeManager",
      message: "Which Employee would you like to update?",
      choices: employeeChoices,
    })

    .then(function (res) {
      employeeId = res.updateEmployeeManager;
    });
    startMenu();
  } 