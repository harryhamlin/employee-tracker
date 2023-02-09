// <====== required packages ======>
const db = require(`../utils/connect.js`)
const Dynamic = require(`./dynamic`)
const dynamic = new Dynamic

// <====== the Display class contains functions that directly pertain to displaying data in a table, all structured as a promises as to return the most readable outoccome in the terminal ======>
class Display {
    // <====== departmentDisplay displays all data columns from the department table ======>
    departmentDisplay = () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM department', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    // <====== roleDisplay displays all data columns from the role column ======>
    roleDisplay = () => { //title id dept salary
        return new Promise((resolve, reject) => {
            db.query('SELECT role.id, title, salary, department.name FROM role JOIN department ON role.department_id = department.id', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    // <====== employeeDisplay displays all data columns from the employee table, as well as the employees job title salary and manager ======>
    employeeDisplay = () => { 
        return new Promise((resolve, reject) => {
            db.query('SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary, department.name AS department_name, CONCAT(man.first_name, " ", man.last_name) AS manager_name FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON man.id = emp.manager_id', (err, res) => {
                if (err) reject(err)
                console.table(res)
                resolve(res)
            })
        })
    }

    // <====== displayByManager displays all the data columns shown in employeeDisplay, but selected by manager ======>
    displayByManager = (managerSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM employee WHERE CONCAT(first_name, " ", last_name) = '${managerSelect}'`, (err, res) => {
                if (err) reject(err);
                const managerId = res[0]['id']
                db.query(`SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary, department.name AS department_name, CONCAT(man.first_name, " ", man.last_name) AS manager_name FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON man.id = emp.manager_id WHERE emp.manager_id = ${managerId}`, (err, res) => {
                    if (err) reject(err);
                    console.table(res)
                    resolve(res)
                })
            })
        })
    }

    // <====== displayByDepartment displays all the data columns shown in employeeDisplay, but selected by department ======>
    displayByDepartment = (departmentSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM department WHERE name = '${departmentSelect}'`, (err, res) => {
                if (err) reject(err);
                const departmentId = res[0]['id']
                db.query(`SELECT emp.id, CONCAT(emp.first_name, " ", emp.last_name) AS employee_name, role.title AS job_title, role.salary, department.name AS department_name, CONCAT(man.first_name, " ", man.last_name) AS manager_name FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON man.id = emp.manager_id WHERE role.department_id = ${departmentId}`, (err, res) => {
                    if (err) reject(err);
                    console.table(res)
                    resolve(res)
                })
            })
        })
    }

    // <====== displayDepartmentBudget totals the utilized budget by department ======>
    displayDepartmentBudget = (departmentSelect) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id FROM department WHERE name = '${departmentSelect}'`, (err, res) => {
                if (err) reject(err);
                const departmentId = res[0]['id']
                db.query(`SELECT SUM(role.salary) AS total_utilized_budget FROM employee emp JOIN role ON emp.role_id = role.id JOIN department ON role.department_id = department.id LEFT JOIN employee man ON man.id = emp.manager_id WHERE role.department_id = ${departmentId}`, (err, res) => {
                    if (err) reject(err);
                    console.table(res)
                    resolve(res)
                })
            })
        })
    }

    // <====== opening title ======>
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