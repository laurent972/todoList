const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');

const maxAge =  3* 24 * 60 * 60 * 1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
         expiresIn:maxAge,
    })
}


module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body

    try{
        const user = await UserModel.create({pseudo, email, password});
        res.status(201).json({user: user._id})

    } catch(err){
        
        const errors = signUpErrors(err);
        res.status(200).send({ errors });  
              
    }
}

module.exports.signIn = async (req, res) =>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.login(email,password);
        const token = createToken(user.id);
        res.cookie('jwt', token, {httpOnly: true, maxAge });
        res.cookie('jwt', token, {
            httpOnly: true, // Empêche l'accès via JavaScript
            secure: true,   // Assurez-vous que c'est défini sur true dans un environnement de production
            sameSite: 'None', // Nécessaire pour les cookies tiers
            maxAge: 3600000, // Durée de vie du cookie (1 heure ici)
        });
    }catch(err){
        res.status(401).send(err);       
    }
}

module.exports.logout = async (req, res) =>{
    try{
        res.cookie('jwt','',{ maxAge : 1 });
       res.redirect('/users')
    
    }catch(err){
        res.status(404).send(err);
    }
    
}