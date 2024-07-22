const mongoose = require('mongoose');
const {isEmail} = require('validator')

const userSchema = new mongoose.Schema(
    {
        pseudo:{
            type:String,
            required: true,
        },
        email: {
            type:String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            trim: true,
        },
        password:{
            type: String,
            required: true,
            max:1024,
            minLength:6
        }
    }
)

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
