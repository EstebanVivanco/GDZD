const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.GuardarProducto =(req, res)=>{

    //ID TIENDA
    const id_tienda = req.session.user.id_tienda;

    const nombre_producto = req.body.nombre_producto;
    const imagen_producto = req.files['image'][0].filename;
    const stock = req.body.stock;
    const precio_producto = req.body.precio_producto;
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    const id_estado_fk = req.body.id_estado_fk;
    const id_bodega_fk = req.body.id_bodega_fk;
    const id_proveedor_fk = req.body.id_proveedor_fk;

    conexion.query('INSERT INTO productos SET ?', [{nombre_producto:nombre_producto , imagen_producto: imagen_producto, stock:stock, precio_producto:precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk:id_estado_fk, id_estado_fk:id_estado_fk, id_tienda_fk: id_tienda, id_bodega_fk: id_bodega_fk, id_proveedor_fk:id_proveedor_fk},  ], (error, results)=>{

        if(error){
            throw error;
        }else{

            conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                    conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                        conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                            res.render('crear_producto',{
                                alert:true,
                                alertTitle: 'Producto Registrado',
                                alertMessage: 'Se ha creado correctamente el producto',
                                alertIcon:'success',
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'productos',
                                user: req.session.user,
                                categoria:categoria,estado:estado,proveedores:proveedores, bodega:bodega
                            })

                        })
                    })
                })
            })

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

                    conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                        conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                            conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                                conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                                    res.render('login',{
                                        alert:true,
                                        alertTitle: 'Conexion exitosa',
                                        alertMessage: 'Bienvenido! ',
                                        alertIcon:'succes',
                                        showConfirmButton: false,
                                        timer: 1500,
                                        ruta: 'productos',
                                        user: req.session.user = results[0],
                                        categoria:categoria,estado:estado,proveedores:proveedores, bodega:bodega
                                    })
                                })
                            })
                        })
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
                        ruta: '/'
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

    const ruta = 'registro';

    conexion.query('INSERT INTO tienda SET ?', {nombre_tienda:nombre,correo_tienda:email,pass_tienda:pass,slogan_tienda:slogan, banner_tienda:imagen, logo_tienda:logo,  horarios_tienda:horaio,id_tipo_fk: tipo, id_sector_fk: sector }, (error, results)=>{
        
        if(error){
            throw error;
        }else{

            res.redirect('/')

        }
    })
}

exports.actualizarProducto =(req, res)=>{

    //ID TIENDA
    const id_tienda = req.session.user.id_tienda;
    //ID PRODUCTO
    const id_producto = req.body.id;
    //nombre producto
    const nombre_producto = req.body.nombre_producto;
    //imagen producto
    const imagen_producto = req.files['image'][0].filename;
    //stock producto
    const stock = req.body.stock;
    //precio producto
    const precio_producto = req.body.precio_producto;
    //id de la categoria del producto
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    //id del estado del producto
    const id_estado_fk = req.body.id_estado_fk;
    //id de la bodega del producto
    const id_bodega_fk = req.body.id_bodega_fk;
    //id del proveedor del producto
    const id_proveedor_fk = req.body.id_proveedor_fk;

    console.log('imagen ', imagen_producto)

    conexion.query('UPDATE productos SET ? WHERE id_producto = ?', [{nombre_producto:nombre_producto , imagen_producto: imagen_producto, stock:stock, precio_producto:precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk:id_estado_fk, id_estado_fk:id_estado_fk, id_tienda_fk: id_tienda, id_bodega_fk: id_bodega_fk, id_proveedor_fk:id_proveedor_fk},  id_producto], (error, results)=>{

        if(error){
            throw error;
        }else{

            conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                    conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                        conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                            conexion.query('SELECT * FROM productos WHERE id_producto = ?',[id_producto],(error, producto)=>{
                                res.render('editar_productos',{
                                    alert:true,
                                    alertTitle: 'Producto actualizado',
                                    alertMessage: 'Se ha actualizado correctamente el producto',
                                    alertIcon:'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'productos',
                                    user: req.session.user,
                                    categoria:categoria,
                                    estado:estado,
                                    proveedores:proveedores, 
                                    bodega:bodega,
                                    producto:producto
                                })

                            })
                        })
                    })
                })
            })

        }
        
    })

}