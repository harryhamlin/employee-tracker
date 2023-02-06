const inquirer = require(`inquirer`)


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
                ]
            })
        return main
    }


    deparmentAdd = [ // name
        {
            type: 'input',
            message: 'department name?',
            name: 'department-name'
        }
    ]

    roleAdd = [ // name salary department
        {
            type: 'input',
            message: 'role name?',
            name: 'role-name'
        },
        {
            type: 'input',
            message: 'salary?',
            name: 'salary'
        },
    ]

    departmentDisplay = [
        {
            type: 'list',
            message: 'departments',

        }
    ]

    employeeAdd = [ // first last role manager
        {
            type: 'input',
            message: 'first name?',
            name: 'first-name'
        },
        {
            type: 'input',
            message: 'last name?',
            name: 'last-name'
        },
    ]


    roleDisplay = [
        {
            type: 'list',
            message: 'roles',
            name: 'roledisplay',
            choices: [{}]
        }
    ]

    managerDisplay = [
        {
            type: 'list',
            message: 'managers',
            choices: [
                {

                }
            ]
        }
    ]

    updateRole = [ // selectemployee newrole
        {
            type: 'list',
            message: 'roles'
        }
    ]

    employeeDisplay = [
        {
            type: 'list',
            message: 'employees',
            choices: [
                {

                }
            ]
        }
    ]
}

module.exports = Static


