const connection = require('./connection');

class DB {
    constructor(connection) {
        this.connection = connection;
    }

    viewEmployees() {
        return this.connection.query(
            `
            SELECT
                employee.id AS ID,
                employee.first_name AS First,
                employee.last_name AS Last,
                role.title AS Role,
                role.salary AS Salary,
                department.dep_name AS Department,
                employee.manager_id AS Manager
            FROM 
                employee
            INNER JOIN     
                role ON employee.role_id = role.id
            INNER JOIN
                department ON role.dep_id = department.id
            ORDER BY
                employee.id
            `
        );
    }

    viewDepartment() {
        return this.connection.query(
            `
            SELECT
                employee.id AS ID,
                employee.first_name AS First,
                employee.last_name AS Last,
                role.title AS Role,
                role.salary AS Salary,
                employee.manager_id AS Manager
            FROM 
                employee
            INNER JOIN     
                role ON employee.role_id = role.id
            WHERE
                role.dep_id = ${2}
            ORDER BY
                employee.id
            `
        )
    }
}

module.exports = new DB(connection);