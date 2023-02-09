const inquirer = require(`inquirer`)
const db = require(`../utils/connect.js`)

class Dynamic {
    selectEmployee = (question) => {
        return new Promise((resolve, reject) => {
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee', async (err, res) => {
                if (err) reject(err);
                const { employeeSelect } = await inquirer.prompt({
                    type: 'list',
                    message: question,
                    name: 'employeeSelect',
                    choices: (() => res.map(res => res.name))
                })
                resolve(employeeSelect)
            })
        })
    }

    selectRole = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT title AS name FROM role', async (err, res) => {
                if (err) reject(err);
                const { roleSelect } = await inquirer.prompt(
                    {
                        type: 'list',
                        message: 'select role',
                        name: 'roleSelect',
                        choices: () => res.map(res => res.name)
                    })
                resolve(roleSelect)
            })
        })
    }

    selectDepartment = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT name FROM department', async (err, res) => {
                if (err) reject(err);
                const { departmentSelect } = await inquirer.prompt(
                    {
                        type: 'list',
                        message: 'select new role',
                        name: 'departmentSelect',
                        choices: () => res.map(res => res.name)
                    })
                resolve(departmentSelect)
            })
        })
    }

}

module.exports = Dynamic