DROP DATABASE IF EXISTS employees_db;

CREATE DATABASE employees_db;

USE employees_db;

SELECT * FROM employees_db.employee;
SELECT * FROM employees_db.role;
SELECT * FROM employees_db.department;

CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INTEGER(10) NOT NULL,
  manager_id INTEGER(10),
  PRIMARY KEY(id),
);

CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL(10,2) NOT NULL,
  dep_id INTEGER(10) NOT NULL,
  PRIMARY KEY(id),
);

CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT,
  dep_name VARCHAR(30) NOT NULL,
  PRIMARY KEY(id)
);

ALTER TABLE role
ADD FOREIGN KEY(role_id) REFERENCES role(id);

ALTER TABLE role
ADD FOREIGN KEY(manager_id) REFERENCES employee(id);

ALTER TABLE role
ADD FOREIGN KEY(dep_id) REFERENCES department(id);