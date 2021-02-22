DROP DATABASE IF EXISTS employees;
CREATE DATABASE employees;
USE employees;

CREATE TABLE departments (
	id INTEGER AUTO_INCREMENT, 
	dep_name VARCHAR(30) NOT NULL UNIQUE,
	PRIMARY KEY(id)
);

INSERT INTO departments (dep_name) VALUES 
    ("Sales"),
    ("Technology"),
    ("Ops"),
    ("HR")
;

CREATE TABLE roles (
	id INTEGER PRIMARY KEY AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL UNIQUE,
	salary DECIMAL(10, 2) NOT NULL,
	department_id INTEGER NOT NULL
);

INSERT INTO roles (title, department_id, salary) VALUES 
    ("Sales Lead", 1, 75000),
    ("Salesperson", 1, 50000),
    ("Software Engineer", 2, 90000),
    ("Developer", 3, 70000),
    ("Manager", 2, 85000),
	("Admin", 4, 40000),
	("HR", 4, 65000)
;

CREATE TABLE employees(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INTEGER NOT NULL,
    manager_id INTEGER NULL
);


INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Richard", "Pryor", 3, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Bill", "Murray", 1, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Wanda", "Sykes", 4, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("George", "Carlin", 2, NULL);
INSERT INTO employees (first_name, last_name, role_id, manager_id) 
VALUES ("Chris", "Jones", 1, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Stacy", "Smith", 2, 3);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Tony", "Porter", 3, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Jenn", "West", 4, 4);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Pat", "Price", 5, 2);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Cory", "Orwell", 6, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Karyn", "Varner", 7, 1);
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Steve", "Seetal", 2, 1);



