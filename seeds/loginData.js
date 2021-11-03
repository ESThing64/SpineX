const { Login } = require ('../models');
const bcrypt = require('bcrypt');

const logindata = [
    {
        first_name: 'Tom',
        last_name: 'Smith',
        email: 'tomsmith25@gmail.com',
        password: 'azsxDCFV0987!@#$'
    },
    {
        first_name: 'Ashley',
        last_name: 'Rodriguez',
        email: 'Ashley.Rodriguez!%#$@gmail.com',
        password: '890^&%$/*'
    },
    {
        first_name: 'Kevin',
        last_name: 'Tupik',
        email: 'kevinTupik@gmail.com',
        password: '3457348&#@^$%@'
    },
    {
        first_name: 'Emma',
        last_name: 'Jones',
        email: 'Emma!Jones!@hotmail.com',
        password: '6tYwerwFDG3#@'
    },
    {
        first_name: 'Mike',
        last_name: 'Chan',
        email: 'MIKECHAN54@hotmail.com',
        password: '8898990^&%$/*'
    },
]

const seedLogin = () => Login.bulkCreate(logindata, {
    individualHooks: true,
    returning: true,
})


module.exports = seedLogin;
