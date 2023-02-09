const inquirer = require(`inquirer`)
const db = require(`../utils/connect`)
const Dynamic = require(`./dynamic`)

const dynamic = new Dynamic



// <====== user input questions ======>
class Static {

    main = async () => {
        const { main } = await inquirer.prompt(
            {
                type: 'list',
                message: 'main menu',
                name: 'main',
                choices: [
                    { name: 'view all departments', },
                    { name: 'view all roles' },
                    { name: 'view all employees' },
                    { name: 'add a department' },
                    { name: 'add a role' },
                    { name: 'add an employee' },
                    { name: 'update an employee role' },
                    { name: 'update employee manager' },
                    { name: 'view employees by manager' },
                    { name: 'view employees by department' },
                    { name: 'delete department' },
                    { name: 'delete role' },
                    { name: 'delete employees' },
                    { name: 'view department budget' },
                    { name: 'exit' }
                ]
            })
        return main
    }

    departmentAdd = async () => {
        const { departmentName } = await inquirer.prompt(
            {
                type: 'input',
                message: 'department name?',
                name: 'departmentName'
            })
        db.query(`INSERT INTO department (name) VALUES ('${departmentName}');`, (err, res) => {
            if (err) throw err;
            if (res) console.log('added');
        })
    }

    roleAdd = async () => {
        const { roleTitle } = await inquirer.prompt(
            {
                type: 'input',
                message: 'role title?',
                name: 'roleTitle'
            });
        const { salary } = await inquirer.prompt(
            {
                type: 'input',
                message: 'salary?',
                name: 'salary'
            });
        const departmentSelect = await dynamic.selectDepartment()
        db.query(`SELECT id FROM department WHERE name = '${departmentSelect}'`, (err, res) => {
            if (err) throw err;
            db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}',${salary},${res[0]['id']})`)
            if (err) throw err;
        })
    }

    employeeAdd = async () => {
        const { employeeFirstName } = await inquirer.prompt(
            {
                type: 'input',
                message: 'employee first name?',
                name: 'employeeFirstName'
            });
        const { employeeLastName } = await inquirer.prompt(
            {
                type: 'input',
                message: 'employee last name?',
                name: 'employeeLastName'
            });
        const roleSelect = await dynamic.selectRole();
        const managerSelect = await dynamic.selectEmployee('select manager');
        db.query(`SELECT id FROM role WHERE title = '${roleSelect}'`, (err, res) => {
            if (err) throw err;
            const roleid = res[0]['id']
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${managerSelect}'`, (err, res) => {
                if (err) throw err;
                const managerid = res[0]['id']
                db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${employeeFirstName}','${employeeLastName}',${roleid},${managerid})`, (err, res) => {
                    if (err) throw err;
                })
            })
        })
    }

    deleteDepartment = (departmentSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`Delete FROM department WHERE name = '${departmentSelect}';`, (err, res) => {
                if (err) reject (err);
                if (res) console.log('deleted');
            })
            resolve(departmentSelect)
        })
    }

    deleteRole = (roleSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`Delete FROM role WHERE title = '${roleSelect}';`, (err, res) => {
                if (err) reject (err);
                if (res) console.log('deleted');
            })
            resolve(roleSelect)
        })
    }

    deleteEmployee = (employeeSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`Delete FROM employee WHERE CONCAT(first_name, " ", last_name) = '${employeeSelect}';`, (err, res) => {
                if (err) reject (err);
                if (res) console.log('deleted');
            })
            resolve(employeeSelect)
        })
    }

    updateEmployeeRole = async () => {
        const employeeSelect = await dynamic.selectEmployee('select employee');
        const newRole = await dynamic.selectRole();
        db.query(`SELECT id FROM role WHERE title = '${newRole}'`, (err, res) => {
            if (err) throw err;
            db.query(`UPDATE employee SET role_id = ${res[0]['id']} WHERE CONCAT(first_name, " ", last_name) = '${employeeSelect}'`, (err, res) => {
                if (err) throw err;
            })
        })
    }

    updateEmployeeManager = async () => {
        const employeeSelect = await dynamic.selectEmployee('select employee');
        const managerSelect = await dynamic.selectEmployee('select manager');
        db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${managerSelect}'`, (err, res) => {
            if (err) throw err;
            db.query(`UPDATE employee SET manager_id = ${res[0]['id']} WHERE CONCAT(first_name, " ", last_name) = '${employeeSelect}'`, (err, res) => {
                if (err) throw err;
            })
        })
    }

    exit = () => db.end()
}

module.exports = Static


