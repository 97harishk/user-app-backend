const User = require('../../models/User')
const jwt = require('jsonwebtoken')

module.exports.register =  async function(req, res){
    try {
        let user = await User.findOne({username: req.body.username});
        if(user){
            setTimeout(function(){ 
                return res.json('202',{
                    message: 'User Already exist!'
                })
            }, 3000);
        }
        user = await User.create(req.body);
        if(user){
            setTimeout(function(){ 
                return res.json('200',{
                    user: user,
                    userId: user._id,
                    token: jwt.sign(user.toJSON(), 'admin', {expiresIn: '100000'}),
                    message: 'User Created!'
                })
            }, 3000);
        }
        else{
            setTimeout(function(){ 
                return res.json('202',{
                    message:'Can not Create User!'
                })
            }, 3000);
        }
    } catch (error) {

       console.log('Error in creating user', error)
    }
   
}

module.exports.login = async (req, res) =>{
    try {
        let user = await User.findOne({username: req.body.username});
            if(user){
                if(req.body.password !== user.password){
                    return res.status('202').json({
                        message: 'Invalid Username or Password!'
                    })   
                }
                else{
                    setTimeout(function(){ 
                        return res.status('200').json({
                            message: 'Logged In Successfully',
                            user: user,
                            userId: user._id,
                            token: jwt.sign(user.toJSON(), 'admin', {expiresIn: '100000'})
                        })
                    }, 3000);
                }
            }
            else{
                setTimeout(function(){
                    return res.status('401').json({
                    message: 'User Not Found!'
                }, 3000);
            })
    }
    } catch (error) {
        return res.json('500',{
        message:'Internal Server error'
    })
    }
}


module.exports.autoLogin = async (req, res) =>{
    try {
        let user = await User.findOne({_id: req.params.localId});
            if(user){
                return res.status('200').json({
                    message: 'Logged In Successfully',
                    user: user
            })
        }
    } catch (error) {
        return res.status('500').json({
        message:'Internal Server error'
    })
    }
}

module.exports.users = async (req, res) =>{
    try {
        let users = await User.find();
        if(users){
            setTimeout(function(){ 
                return res.status('200').json({
                    message: 'User data found',
                    users: users,
                })
             }, 3);
        }
    } catch (error) {
        return res.status('500').json({
        message:'Internal Server error',
    })
}
}

module.exports.delete = async (req, res) =>{
    try {
        let user = await User.findByIdAndDelete(req.params.userId);
        if(user){
            setTimeout(function(){ 
                return res.status('200').json({
                    message: 'User Deleted',
                    user: user,
                })
            }, 3000);
        }
        else{
            setTimeout(function(){ 
                return res.status('202').json({
                    message: 'Can not delete user'
                })
            }, 3000);
        }
    } catch (error) {
        return res.status('500').json({
        message:'Internal Server error',
    })
}
}

module.exports.update =  async function(req, res){
    try {
        let user = await User.findOne({_id: req.params.userId});
        if(user){
            user.first_name = req.body.first_name;
            user.lastname_name = req.body.last_name;
            user.username = req.body.username;
            user.password = req.body.password;
            user.save();
            setTimeout(function(){ 
                return res.status('200').json({
                    user: user,
                    message: 'User Updated!'
                })
            }, 3000);
        }
        else{
            setTimeout(function(){ 
                return res.status('202').json({
                    message:'Can not Create User!'
                })
            }, 3000);
        }
    } catch (error) {

       console.log('Error in creating user', error)
    }
   
}