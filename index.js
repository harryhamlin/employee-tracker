const Static = require(`./lib/static`)
const Dynamic = require(`./lib/dynamic`)
const Display = require(`./lib/display`)

const static = new Static
const dynamic = new Dynamic
const display = new Display


async function main() {
    switch (await static.main()) {
        case ('view all departments'):
            display.departmentDisplay()
            .then(() => (main()))
            break;
        case ('view all roles'):
            display.roleDisplay()
            .then(() => (main()))
            break;
        case ('view all employees'):
            display.employeeDisplay()
            .then(() => (main()))
            break;
        case ('add a department'):
            static.departmentAdd()
            break;
        case ('add a role'):
            static.roleAdd()
            break;
        case ('update an employee role'):
            dynamic.updateEmployeeRole()
            break;
        case ('exit'):
            static.exit()
            break;
    }
}

display.titleDisplay()
main()


