const mongoose = require('mongoose');
const {isEmail} = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
    {
        pseudo:{
            type:String,
        },
        email: {
            type:String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true
        },
        password:{
            type: String,
            required: true,
            max:1024,
            minLength:6
        }
    }
);

//play function before save into DB
userSchema.pre("save", async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
} );

userSchema.statics.login = async function(email, password){
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth){
            return user;
        }
        throw ({'Erreur':'Mot de passe incorrect'})
    }
   throw ({'Erreur':'email incorrect'})
}

const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
