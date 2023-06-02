const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.GuardarProducto =(req, res)=>{

    //ID TIENDA
    const id_tienda = 4;

    const nombre_producto = req.body.nombre_producto;
    const imagen_producto = req.file.filename;
    const stock = req.body.stock;
    const precio_producto = req.body.precio_producto;
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    const id_estado_fk = req.body.id_estado_fk;
    const id_bodega_fk = req.body.id_bodega_fk;
    const id_proveedor_fk = req.body.id_proveedor_fk;

    conexion.query('INSERT INTO productos SET ?', [{nombre_producto:nombre_producto , imagen_producto: imagen_producto, stock:stock, precio_producto:precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk:id_estado_fk, id_estado_fk:id_estado_fk, id_tienda_fk: id_tienda, id_bodega_fk:1, id_proveedor_fk:1},  ], (error, results)=>{


        if(error){
            throw error;
        }else{
            res.redirect('/productos');
        }
        
    })

}

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
    const imagen = req.files['image'][0].filename;
    const logo = req.files['logo'][0].filename;
    const horaio = 'Lun-Vie: 9AM-8PM, Sáb-Dom: 10AM-6PM';
    const tipo = req.body.tipo;
    const sector = req.body.sector;

    console.log(imagen);
    console.log(logo);



    conexion.query('INSERT INTO tienda SET ?', {nombre_tienda:nombre,correo_tienda:email,pass_tienda:pass,slogan_tienda:slogan, banner_tienda:imagen, logo_tienda:logo,  horarios_tienda:horaio,id_tipo_fk: tipo, id_sector_fk: sector }, (error, results)=>{
        console.log("results --> ", results);
        
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
                ruta: '/'
            })
        }
    })
}