const dbu = require('../db/db_utils');

exports.getComptes = (id) =>{
    return dbu.getComptesById('Bank','Compte', id);
}

exports.getOperationsByCompte = (idCompte) =>{
    
    return dbu.getOperationsByIdCompte('Bank','Operations', idCompte);
}

exports.getOperationsByClient = (idClient) =>{
    
    return dbu.getOperationsByIdClient('Bank','Operations', idClient);
}

exports.createCompte = (compte) => {
    return dbu.createCompte(compte);
}

exports.creationCompteOperation = (operation) => {
    return dbu.createOperation(operation)
}

exports.getmodifySoldeCompte = (id, newSolde) => {
 
    return dbu.modifySoldeCompte(id, newSolde)
}