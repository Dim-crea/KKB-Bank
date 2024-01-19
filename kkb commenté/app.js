//le fichier app sert a paramétrer son serveur. 
//C'est dans ce fichier que l'on télécharger les module necessaire au développement de notre site.
//il contient aussi le port sur lequel notre script sera écouté 
//on instancie le framework express
const express = require('express')
//cookie-parser permet de traiter de facon efficace les cookie d'un utilisateur lors d'une requête
const cookieParser = require('cookie-parser');
//Les sessions sont utilisées pour stocker des données spécifiques à un utilisateur tout au long de sa navigation comme les données de connexion, les préférences utilisateur, etc.
const session = require('express-session');

const PORT = 3000;

// import middleware
//path permet de travailler avec des chemins entre les fichiers
const path = require("path");
// body parser permet d'interpretter le corps JS une requete http 
const bodyParser = require("body-parser");
// bootstrap est un fichier 
const bootstrap = require("./src/bootstrap");

// app start
const app = express();

// set up session
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 60*60*1000}
  }))
  
// ici on dit a express que l'on souhaite utiliser le moteur de vue ejs
// lorsque une vue en format de fichier ejs sera envoyé en réponse express pourra interpretter ce fichier en utilisant le moteur de vue ejs
//setup ejs
app.set('view engine', 'ejs');
// ici on informe ou se trouve les fichier ejs 
app.set('views', path.resolve('./src/views'));

//cette ligne nous permet de servir des fichiers statiques, tels que des images, des fichiers CSS, des scripts JavaScript, etc., à partir d'un répertoire spécifique dans une application Express.
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(cookieParser());

//Express Router est un composant d'Express.js qui permet de regrouper des routes et des middlewares associés dans des modules réutilisables et modulaires.
const router = express.Router();
app.use(router);


bootstrap(app,router);

// use routes


router.use((err, req, res, next)=>{
    if(err){
        //
        return res.send(err.message);
    }
})

// ici est la fin du fichier app. 
app.listen(PORT, (err)=>{
    if(err) return console.log("connot start server ...")
    console.log("server launch");
})