
const User = require('./models/User')


const user = async () => {
    try {
        
        for(let i = 0; i < 500; i++){

            const data = {
                first_name: 'Harish',
                last_name: 'Kumar',
                username: `${i}harish`,
                password: 1234,
            }
            const user = await User.create(data); 
            console.log(user);
            }

    } catch (error) {
        console.log(error)   
    }
};
user();