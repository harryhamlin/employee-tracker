const inquirer = require(`inquirer`)
const db = require(`../server.js`)

class Dynamic {
    updateEmployeeRole = async () => {
        db.query('SELECT CONCAT(first_name, " ", last_name) AS name FROM employee', (err,res) => {
            if (err) throw err;
            const { employeeSelect } = inquirer.prompt({
                type: 'list',
                message: 'select employee',
                name: 'employeeSelect',
                choices: () => res.map(res => res.name)
            })
        })
        // await db.query('SELECT title AS name FROM role', (err, res) => {
        //     if (err) throw err;
        //     const { roleSelect } = inquirer.prompt(
        //         {
        //             type: 'list',
        //             message: 'select new role',
        //             name: 'roleSelect',
        //             choices: () => res.map(res => res.name)
        //         }
        //     )
        // })
        
    }

}

module.exports = Dynamic