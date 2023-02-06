const Static = require(`./lib/static`)
const Dynamic = require(`./lib/dynamic`)

const static = new Static
const dynamic = new Dynamic



async function main() {
    switch (await static.main()) {
        case ('view all roles'):
            await dynamic.roleDisplay()
            break;
    }
}

main()