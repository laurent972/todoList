const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');
const { default: next } = require('next');

module.exports.checkUser = (req, res, next) => {
    //with cookie parser
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.TOKEN_SECRET, async(err, decodedToken) =>{
            if(err){
                res.local.user = null;
                res.cookie('jwt','', {maxAge:1});
                next();
            }else{
                let user = await UserModel.findById(decodedToken);
                res.locals.user = user;
                console.log(user);
                next();
            }
        })
    }else{
        res.locals.user = null;
        next();
    }
}
