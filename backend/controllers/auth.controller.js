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

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Tenter de connecter l'utilisateur
        const user = await UserModel.login(email, password);

        // Générer un token JWT pour l'utilisateur
        const token = createToken(user._id); // Assurez-vous que `createToken` fonctionne correctement

        // Définir le cookie JWT
        res.cookie('jwt', token, {httpOnly: true,sameSite: 'None', maxAge });

        // Répondre avec succès
        res.status(200).json({ message: 'Login successful', user: user._id });
    } catch (err) {
        // Si une erreur survient, renvoyer un message d'erreur
        console.error('Login error:', err);
        res.status(401).json({ error: 'Invalid credentials' });
    }
};

module.exports.logout = async (req, res) =>{
    try{
        res.cookie('jwt','',{ maxAge : 1 });
       res.redirect('/users')
    
    }catch(err){
        res.status(404).send(err);
    }
    
}