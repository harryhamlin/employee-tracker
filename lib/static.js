const inquirer = require(`inquirer`)
const db = require(`../server`)





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
                    { name: 'exit'}
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
        const { departmentID } = await inquirer.prompt(
            {
                type: 'input',
                message: 'department id?',
                name: 'departmentID'
            });
        db.query(`INSERT INTO role (title, salary, department_id) VALUES ('${roleTitle}',${salary},${departmentID});`, (err, res) => {
            if (err) throw err;
            if (res) console.log('added');
        })
    }

    exit = () => db.end()
}

module.exports = Static


