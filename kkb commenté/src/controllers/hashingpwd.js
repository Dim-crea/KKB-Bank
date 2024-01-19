const bcrypt = require('bcrypt');
exports.hash  = () =>{
    bcrypt.hash('1234', 10).then(function(hash) {
        console.log(hash)
    });
}