const {Schema,model} = require("mongoose");

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    }
})

const UserModel = model("weatherUser", UserSchema);
module.exports = UserModel