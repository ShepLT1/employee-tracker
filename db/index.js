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

    viewDepartment(dept) {
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
            INNER JOIN
                department ON role.dep_id = department.id
            WHERE
                department.dep_name = ?
            ORDER BY
                employee.id
            `, [dept]
        )
    }

    viewRole(role) {
        return this.connection.query(
            `
            SELECT
                employee.id AS ID,
                employee.first_name AS First,
                employee.last_name AS Last,
                role.salary AS Salary,
                department.dep_name AS Department,
                employee.manager_id AS Manager
            FROM 
                employee
            INNER JOIN     
                role ON employee.role_id = role.id
            INNER JOIN
                department ON role.dep_id = department.id
            WHERE
                role.title = ?
            ORDER BY
                employee.id
            `, [role]
        )
    }

    addEmployee(first, last, role, man) {
        return this.connection.query(
            `
            INSERT INTO
                employee
            SET
                ?
            `, {
                first_name: first,
                last_name: last,
                role_id: role,
                manager_id: man
            }
        )
    }

    addDepartment(dept) {
        return this.connection.query(
            `
            INSERT INTO
                department
            SET
                ?
            `, {
                dep_name: dept
            }
        )
    }

    addRole(title, sal, dept) {
        return this.connection.query(
            `
            INSERT INTO
                role
            SET
                ?
            `, {
                title: title,
                salary: sal,
                dep_id: dept
            }
        )
    }

    updateRole(role, empId) {
        return this.connection.query(
            `
            UPDATE
                employee
            SET
                ?
            WHERE
                ?
            `, [{
                role_id: role
            }, {
                id: empId
            }]
        )
    }

    getRoles() {
        return this.connection.query(
            `
            SELECT
                role.title
            FROM
                role
            `
        )
    }

    getEmployees() {
        return this.connection.query(
            `
            SELECT
                employee.first_name,
                employee.last_name
            FROM
                employee
            `
        )
    }

    getDepartments() {
        return this.connection.query(
            `
            SELECT
                department.dep_name
            FROM
                department
            `
        )
    }

    getEmployeeID(first, last) {
        return this.connection.query(
            `
            SELECT
                employee.id
            FROM
                employee
            WHERE
                employee.first_name = ? AND employee.last_name = ?
            `, [first, last]
        )
    }

    getRoleID(role) {
        return this.connection.query(
            `
            SELECT
                role.id
            FROM
                role
            WHERE
                role.title = ?
            `, [role]
        )
    }

    getDeptID(dept) {
        return this.connection.query(
            `
            SELECT
                department.id
            FROM
                department
            WHERE
                department.dep_name = ?
            `, [dept]
        )
    }

    updateRole(role, emp) {
        return this.connection.query(
            `
            UPDATE
                employee
            SET
                employee.role_id = ?
            WHERE
                employee.id = ?

            `, [role, emp]
        )
    }
}

module.exports = new DB(connection);