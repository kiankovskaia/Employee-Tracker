  
INSERT INTO role (title, salary, department_id)
VALUES ("Manager", 120000, 1), ("Engineer", 150000, 2), ("Intern", 60000, 3);

INSERT INTO department (name)
VALUES ("Administration"), ("Engineering"), ("Interns");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Kristina", "Iankovskaia", 1, 2), ("Anthony", "Smith", 2, 1), ("Michael", "Jackson", 3, 2);