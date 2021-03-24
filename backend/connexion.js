const mysql = require('mysql');

/* Connection to MySql Database */
const connexion = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'projet7'
});

connexion.connect(function(err) {
   if(err){
    console.log('Erreur de connection');
    return;
  }
  console.log('Connection établie');
});

module.exports = connexion;