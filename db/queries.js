
// SQL Query Functions


const connection = require("./connection");

class Db {
  constructor(connection) {
    this.connection = connection;
  }


  // VIEW Employees
  viewAllEmployees() {
    return this.connection.query("SELECT * FROM employee;");
  }

  viewAllManagers(id) {
    return this.connection.query("SELECT * FROM employee WHERE id != ?", id);
  }

  // VIEW Departments
  viewDepartments() {
    return this.connection.query("SELECT * FROM department;");
  }

  // VIEW Roles
  viewRoles() {
    return this.connection.query("SELECT * FROM role;");
  }


  // ADD Employeee
  addEmployee(first_name, last_name, role_id, manager_id) {
    return this.connection.query(
      `INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES ('${first_name}', '${last_name}', ${role_id}, ${manager_id});`
    );
  }

  // ADD Department
  addDepartment(name) {
    return this.connection.query(
      `INSERT INTO department (name)
        VALUES ('${name}');`
    );
  }

  // ADD Role
  addRole(title, salary, department_id) {
    return this.connection.query(
      `INSERT INTO role (title, salary, department_id)
        VALUES ('${title}', '${salary}', '${department_id}');`
    );
  }

 
  //   DELETE Employee
  deleteEmployee(id) {
    return this.connection.query("DELETE FROM employee WHERE id = ?;", id);
  }

  // DELETE Department
  deleteDepartment(id) {
    return this.connection.query("DELETE FROM department WHERE id = ?;", id);
  }

  // DELETE Role
  deleteRole(id) {
    return this.connection.query("DELETE FROM role WHERE id = ?;", id);
  }


  // Update Employee Role
  updateEmployeeRole(role_id, id) {
    return this.connection.query(
      `UPDATE employee SET employee.role_id = ${role_id} WHERE employee.id = ${id};`
    );
  }

  // Update Employee Manager
  updateEmployeeManager(manager_id, id) {
    return this.connection.query(
      `UPDATE employee SET employee.manager_id = ${manager_id} WHERE employee.id = ${id};`
    );
  }
}

module.exports = new Db(connection);