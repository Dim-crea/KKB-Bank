const adminModel = require('../models/adminModel');
const bcrypt = require('bcrypt');

//en mettant export. avant la déclaration d'une fonction cela permet de l'utiliser dans un autre fichier (en utilisanrt require dans l'autre)
//c'est la déclaration de la fonction qui fournira la vue de l'admin 
exports.displayDashBoardAdmin = async (req, res) => {
    admin = req.body;
    console.log(admin)
    await adminModel.getInfo(admin.email).then(async infosAdmin =>{ //on va chercher l'adresse mail dans notre base de donné grace à notre méthode getinfo fourni par notre model adminModel.
        if(bcrypt.compareSync(admin.password, infosAdmin.password)){ // si les mots de passes collent nous allons faire ça 
            let listComptes = []; 
            let listClients = []
            let listOperations = [];

            await adminModel.getAll('utilisateurs').then(async clients =>{ // on parcourt la liste des clients
                listClients = clients;
                await adminModel.getAll('compte').then( async comptes =>{ // ensuite on fait la meme pour les comptes clients
                    listComptes = comptes;  
                    await adminModel.getAll('operations').then( operations =>{ // puis on parcours les opérations
                        listOperations = operations;  
                        listOperations.sort(function compare(a, b) { // et la on classe avec sort les operation par date 
                            if (a.dateOperation < b.dateOperation)
                            return -1;
                            if (a.dateOperation > b.dateOperation )
                            return 1;
                            return 0;
                        
                        })
                    });
                    req.sessgdion.regenerate(function (err) {
                        if (err) next(err)
                    
                        req.session.isAdmin = true;
                        req.session.infosAdmin = infosAdmin;
                        req.session.listClients = listClients;
                        req.session.listComptes = listComptes;
                        req.session.listOperations = listOperations;
                        // save the session before redirection to ensure page
                        // load does not happen before session is saved
                        req.session.save(function (err) {
                          if (err) return next(err)
                          res.render('page/dashboardAdmin.ejs', {infosAdmin, listClients, listComptes, listOperations});
                        })
                    
                    })
                })
            })
        } else { // if no match return the form of connexion and display a message
            res.render("page/connexFormAdmin.ejs", {message: "Erreur à la connexion. Vérifiez les informatiosn transmises"})
        }
    })
    
}


// exports.getAllUsers =  (req, res, next)=>{
//     userModel.getAllUsers().then((users) =>{
//         res.render('page/users', {users});
//     });
    
// }

// exports.addUser = (req, res, next) =>{
//     user = req.body; //recory the form's parameters
//     parseInt(user['age']); //attempt to transform the typeof age into int. failed ...
//     console.log(user);
//     userModel.addUser(user).then(()=>{
//         res.render('page/formAddUser', {
//             message: "Utilisateur ajouté avec succès"
//         })
//     })

// }

// exports.modifyUser = (req, res, next) => {
//     user = req.body;
//     userModel.modifyUser(user).then(
//         res.render('page/index', {
//             message: user['name']+" a bien été modifié"
//         })
//     )

// }

// exports.deleteUser = (req, res, next) => {
//     userModel.deleteUser(req.body.name).then(
//         res.render('page/index', {
//             message: "L'utilisateur a bien été supprimé"
//         })
//     )
// }