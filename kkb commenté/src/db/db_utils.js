//après avoir installer le module mongodb 
//le fait d'utiliser {MongoClient} permet d'importer la classe MongoClient du module mongodb et pas la totalité du module
const {MongoClient}  = require('mongodb');
//url correspond au lien de connexion a notre base de donné
const url = "mongodb://kkb_user:kkb_passwd@mongo:27017/?authMechanism=DEFAULT";

exports.getAll = (collec)=>{
   
    const client = new MongoClient(url);

    async function run(collec){
        try{
            const dataBase = client.db('Bank');
            const collection = dataBase.collection(collec);
            if(collec === 'Utilisateurs') {  
                const promise = await collection.find().project({"_id":0, "password": 0}).toArray();
                return promise;
            } else {
                const promise = await collection.find().toArray();
                return promise;
            }
            

        }finally{
            await client.close();
        }
        
    }
    return run(collec).catch(console.dir);
}

exports.addClient = async (newUser) =>{
    const client = new MongoClient(url);
    
    try{
        const db = client.db('Bank');
        const users_collec = db.collection('Utilisateurs');
        let promise = await users_collec.insertOne(newUser).then( result => {
            
             return result.insertedId.toString();
          })
          .catch(err => {
            console.error("erreur lors de l'ajout d'utilisateur : ", err.message)
          });
        
          return promise;
             

    }catch(error){
        console.error('erreur ajout client: ', error.message);
    }finally{
        await client.close();
    } 
}

exports.getOne = async (collec, objectEmail) => {
    const client = new MongoClient(url);
    try{
        const db = client.db('Bank');
        const users_collec = db.collection(collec);
        const promise = await users_collec.findOne({email: objectEmail}, {});
        
        return promise;


    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await client.close();
    }
}

exports.modifyClient= async (user) => {
    const client = new MongoClient(url);
    try{        
        const promise = await client.db('Bank').collection('Utilisateurs').updateOne({name: user['name']}, {$set: {type: user['type'], age: user['age']}});
        console.log(promise);
        return promise;
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await client.close();
    }
}

exports.deleteClient= async (name) => {
    const client = new MongoClient(url);
    try{        
        const promise = await client.db('Bank').collection('Utilisateurs').deleteOne({name: name});
        console.log(promise);
        return promise;
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await client.close();
    }
}

exports.getComptesById= async (bdd, collec, id) => {
    const user = new MongoClient(url);
    try{        
        const promise = await user.db(bdd).collection(collec).find({numeroClient: id}).toArray();
        // console.log(promise)
        return promise;
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await user.close();
    }
}

exports.getOperationsByIdCompte= async (bdd, collec, id) => {
    const user = new MongoClient(url);
    try{        
        const promise = await user.db(bdd).collection(collec).find({compteEmetteur: id}).toArray();
        return promise;
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await user.close();
    }
}

exports.getOperationsByIdClient= async (bdd, collec, id) => {
    const user = new MongoClient(url);
    try{        
        const promise = await user.db(bdd).collection(collec).find({numeroClient: id}).toArray();
        return promise;
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await user.close();
    }
}

exports.createCompte = async(compte) => {
    const user = new MongoClient(url);
    try{        
        let promise = await user.db('Bank').collection('Compte').insertOne(compte).then( result => {
            
            return result.insertedId.toString();
         });
        return promise;
    }catch(err){
        console.error("error create compte: ", err.message);
    }finally{
        await user.close();
    }
}

exports.createOperation = async (operation) =>{
    const user = new MongoClient(url);
    try{        
        await user.db('Bank').collection('Operations').insertOne(operation);
        return "Votre demande a bien été prise en compte et va être traitée sous peu";
    }catch(err){
        console.error("error create compte: ", err.message);
    }finally{
        await user.close();
    }
} 

exports.modifySoldeCompte= async (id, newSolde) => {
    const client = new MongoClient(url);
    try{        
        const promise = await client.db('Bank').collection('Compte').updateOne({compte: id}, {$set: {solde: newSolde}});
        //$set mettre a jour les valeurs, modifier les données existantes.
    }catch(err){
        console.error("error : ", err.message);
    }finally{
        await client.close();
    }
}