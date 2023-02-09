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
                .then(() => (main()))
            break;
        case ('add a role'):
            static.roleAdd()
                .then(() => (main()))
            break;
        case ('add an employee'):
            break;
        case ('update an employee role'):
            dynamic.updateEmployeeRole()
                .then(() => (main()));
            break;
        case ('update an employee manager'):
            break;
        case ('view employees by manager'):
            break;
        case ('view employees by department'):
            break;
        case ('delete department'):
            dynamic.selectDepartment()
                .then((departmentSelect) => dynamic.deleteDepartment(departmentSelect))
                .then(() => (main()))
            break;
        case ('delete role'):
            dynamic.selectRole()
                .then((roleSelect) => dynamic.deleteRole(roleSelect))
                .then(() => (main()))
            break;
        case ('delete employees'):
            dynamic.selectEmployee()
                .then((employeeSelect) => dynamic.deleteEmployee(employeeSelect))
                .then(() => (console.log('updated')))
                .then(() => main())
            break;
        case ('view department budget'):
            break;
        case ('exit'):
            static.exit()
            break;
    }
}

display.titleDisplay()
main()


