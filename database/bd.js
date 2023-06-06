const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
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