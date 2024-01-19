 
const dbu = require('../db/db_utils');

exports.getInfo = (email) => {
    return dbu.getOne('Admin', email)
}

exports.getAll = (collec)=>{
    return dbu.getAll(collec);
}

exports.getOneClient = (name) =>{
    return dbu.getOne('Utilisateurs', email);
}
exports.addClient = async (user)=>{
    return dbu.addUser(user);
}

exports.modifyClient = async(user)=>{
    return dbu.modifyUser(user);
}

exports.deleteClient = async(name)=>{
    return dbu.deleteUser(name);
}