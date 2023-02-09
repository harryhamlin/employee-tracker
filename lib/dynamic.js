const inquirer = require(`inquirer`)
const db = require(`../server.js`)

class Dynamic {
    selectEmployee = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee', async (err, res) => {
                if (err) reject(err);
                const { employeeSelect } = await inquirer.prompt({
                    type: 'list',
                    message: 'select employee',
                    name: 'employeeSelect',
                    choices: () => res.map(res => res.name)
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
        const employeeSelect = await this.selectEmployee();
        const newRole = await this.selectRole();
        db.query(`SELECT id FROM role WHERE title = '${newRole}'`, (err, res) => {
            if (err) throw err;
            db.query(`UPDATE employee SET role_id = ${res[0]['id']} WHERE CONCAT(first_name, " ", last_name) = '${employeeSelect}'`, (err, res) => {
                if (err) throw err;
            })
        })

    }

}

module.exports = Dynamic