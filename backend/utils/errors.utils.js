module.exports.signUpErrors = (err) =>{
    let errors = {email:'', password:''}

    if(err.errmsg.includes('email'))
        errors.email = "Email invalide";

    if(err.errmsg.includes('password'))
        errors.email = "Mot de passe invalide";

    if(err.code === 1100 && Object.keys(err.keyValue)[0].includes('email'))
        errors.email = "Cet email existe déjà";

    return errors
}

