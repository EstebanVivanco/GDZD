const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'aeropuertost.conqcjlyj4pc.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'aeropuertost',
    database: 'aeropuerto'
});

conexion.connect((error)=>{
    if(error){
        console.log('Error al conectar con la base de datos');
        return
    }
    console.log('Conectado con la base de datos de descansovich, buuuuenas');
});

module.exports = conexion;