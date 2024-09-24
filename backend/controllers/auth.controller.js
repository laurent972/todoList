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

        const userId=user.id;
        const token = jwt.sign({ id: userId }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('jwt', token, {
            httpOnly: true, // Ne peut pas être accessible via JavaScript
            secure: process.env.NODE_ENV === 'production', // Utiliser HTTPS en production
            sameSite: 'None', // Permettre l'envoi du cookie dans des contextes inter-origines
            maxAge: 3600000, // Durée de vie du cookie (ex : 1 heure)
        });
        return res.status(200).json({ message: 'Connexion réussie' });
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