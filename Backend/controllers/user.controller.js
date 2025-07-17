const UserModel = require('../models/user.model')

const signup = async (req, res)=>{
    try {
        console.log(req.body.email)
        createdUSer = await UserModel.create(req.body)    
        if(createdUSer){
            return res.status(200).json({
                success:true,
                message:"Account created Successfully"
            })
        }
        else{
            return res.status(400).json({
                success:false,
                message:"Failed to create account"
            })
        }
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

const login = async (req, res)=>{
    try {
        user = await UserModel.findOne({
            email:req.body.email,
            password:req.body.password
        })
        if(user){
            return res.status(200).json({
                success:true,
                message:"Loggedin successfully"
            })
        }
        return res.status(400).json({
            success:"false",
            message:"Invalid credential"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}


module.exports = {signup, login}