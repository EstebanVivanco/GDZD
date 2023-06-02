const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.login = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;
    if(correo && pass){
        conexion.query('SELECT * FROM tienda WHERE correo_tienda = ? AND pass_tienda = ? ', [correo, pass], (error, results)=>{
            if(error){
                throw error;
            }else{
                if(results.length > 0){
                    //ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Conexion exitosa',
                        alertMessage: 'Bienvenido! ',
                        alertIcon:'succes',
                        showConfirmButton: false,
                        timer: 1500,
                        ruta: '',
                        //user: req.session.user = results[0]
                    })
                }else{
                    //NO ENTRA
                    res.render('login',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Nombre o contraseña incorrectos!',
                        alertIcon:'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: 'ver_productos'
                    })
                }
            }
        })
    }

}


exports.savestore =(req, res)=>{
    const nombre = req.body.name;
    const email = req.body.correo;
    const pass = req.body.password;
    const slogan = req.body.slogan;
    const imagen= req.file.filename;
    const horaio = 'Lun-Vie: 9AM-8PM, Sáb-Dom: 10AM-6PM';
    const tipo = req.body.tipo;
    const secotr = req.body.sector;



    conexion.query('INSERT INTO tienda SET ?', {nombre_tienda:nombre,correo_tienda:email,pass_tienda:pass,slogan_tienda:slogan, logo_tienda:imagen, horarios_tienda:horaio,id_tipo_fk:tipo, id_sector_fk:secotr }, (error, results)=>{
        console.log(results)
        if(error){
            throw error;
        }else{
            res.render('registro',{
                alert:true,
                alertTitle: 'Resgistro',
                alertMessage: 'Registro de tienda exitoso!',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })
}