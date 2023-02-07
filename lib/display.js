const db = require(`../server.js`)




class Display {
    departmentDisplay = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM department', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    roleDisplay = () => { //title id dept salary
        return new Promise((resolve, reject) => {
            db.query('SELECT role.id, title, salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    employeeDisplay = () => { // emp id, emp fname, emp lname, job title, dept, salaries, managers
        return new Promise((resolve, reject) => {
            db.query('SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary, department.name AS department_name, CONCAT(man.first_name, " ", man.last_name) AS manager_name FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON man.id = emp.manager_id', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    titleDisplay = () => {
        console.log('\x1b[36m%s\x1b[0m', `  
         _______  __   __  _______  ___      _______  __   __  _______  _______ 
        |       ||  |_|  ||       ||   |    |       ||  | |  ||       ||       |
        |    ___||       ||    _  ||   |    |   _   ||  |_|  ||    ___||    ___|
        |   |___ |       ||   |_| ||   |    |  | |  ||       ||   |___ |   |___ 
        |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|
        |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___ 
        |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|
       ______   _______  _______  _______  _______  _______  _______  _______   
      |      | |   _   ||       ||   _   ||  _    ||   _   ||       ||       |  
      |  _    ||  |_|  ||_     _||  |_|  || |_|   ||  |_|  ||  _____||    ___|  
      | | |   ||       |  |   |  |       ||       ||       || |_____ |   |___   
      | |_|   ||       |  |   |  |       ||  _   | |       ||_____  ||    ___|  
      |       ||   _   |  |   |  |   _   || |_|   ||   _   | _____| ||   |___   
      |______| |__| |__|  |___|  |__| |__||_______||__| |__||_______||_______|  
      
      `)
    }
}

module.exports = Display