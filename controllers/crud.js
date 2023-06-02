const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.login = (req, res)=>{
    const correo = req.body.email;
    const pass = req.body.password;
    if(correo && pass){
        conexion.query('SELECT * FROM tienda WHERE email_usuario = ? AND password_usuario = ? ', [correo, pass], (error, results)=>{
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
                        ruta: 'vista_catalogo',
                        user: req.session.user = results[0]
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
                        ruta: ''
                    })
                }
            }
        })
    }

}
exports.savestore =(req, res)=>{
    const rut = req.body.rut;
    const nombre = req.body.name;
    const correo = req.body.correo;
    const pass = req.body.password;
    const imagen= req.file.filename;
    const ubicacion = req.body.ubicacion;

    conexion.query('INSERT INTO tienda SET ?', {rut_tienda:rut,nombre_tienda:nombre,email_tienda:correo,password_tienda:pass, logo:imagen, ubicacion_tienda:ubicacion}, (error, results)=>{

        if(error){
            throw error;
        }else{
            res.render('registroT',{
                alert:true,
                alertTitle: 'Resgistro',
                alertMessage: 'Registro de tienda exitoso!',
                alertIcon:'success',
                showConfirmButton: false,
                timer: 1500,
                ruta: 'loginTienda'
            })
        }
    })
}