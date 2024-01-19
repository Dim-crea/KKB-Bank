const dbu = require('../db/db_utils');

exports.getInfo = (email) =>{
    
    return dbu.getOne('Utilisateurs', email);
}

exports.addUtilisateur = (utilisateur) => {
    return dbu.addClient(utilisateur);
}