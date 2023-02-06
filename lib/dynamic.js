const inquirer = require(`inquirer`)
const db = require(`../server.js`)

class Dynamic {
    roleDisplay = async () => {
        db.query('SELECT title AS name FROM role', (err, res) => {
            if (err) throw err
            inquirer.prompt(
                {
                    type: 'list',
                    message: 'roles',
                    name: 'roledisplay',
                    choices: () => res.map(res => res.name)
                }
            )
        })
    }
}

module.exports = Dynamic