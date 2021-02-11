-- DROP DB 
DROP DATABASE IF EXISTS employees_db;

-- CREATE DB
CREATE DATABASE employees_db;

-- USE DB
USE employees_db;

-- CREATE department table
CREATE TABLE department (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

-- CREATE role table
CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT,
    PRIMARY KEY (id)
);

-- CREATE employee table
CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    PRIMARY KEY (id)
);

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 120000, 1), ("Engineer", 150000, 2), ("Intern", 60000, 3);

INSERT INTO department (name)
VALUES ("Administration"), ("Engineering"), ("Interns");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kristina", "Iankovskaia", 1, 2), ("Anthony", "Smith", 2, 1), ("Michael", "Jackson", 3, 2);