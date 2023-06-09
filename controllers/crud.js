const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.GuardarProducto = (req, res) => {


    //ID TIENDA
    const id_tienda = req.session.user.id_tienda;

    const nombre_producto = req.body.nombre_producto;
    const imagen_producto = req.files['image'][0].filename;
    const stock = req.body.stock;
    const precio_producto = req.body.precio_producto;
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    const id_estado_fk = req.body.id_estado_fk;
    // const id_bodega_fk = req.body.id_bodega_fk;
    const id_proveedor_fk = req.body.id_proveedor_fk;


    conexion.query('INSERT INTO productos SET ?', [{ nombre_producto: nombre_producto, imagen_producto: imagen_producto, stock: stock, precio_producto: precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk: id_estado_fk, id_estado_fk: id_estado_fk, id_tienda_fk: id_tienda, id_proveedor_fk: id_proveedor_fk },], (error, results) => {

        if (error) {
            throw error;
        } else {

            conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                    conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                        conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                            res.render('crear_producto', {

                                alert: true,
                                alertTitle: 'Producto Registrado',
                                alertMessage: 'Se ha creado correctamente el producto',
                                alertIcon: 'success',
                                showConfirmButton: false,
                                timer: 1500,
                                ruta: 'productos',
                                user: req.session.user,
                                trabajador: req.session.trabajador,
                                categoria: categoria, estado: estado, proveedores: proveedores, bodega: bodega
                                
                            })

                        })
                    })
                })
            })

        }

    })

}

exports.login = (req, res) => {
    const correo = req.body.email;
    const pass = req.body.password;
    if (correo && pass) {
        conexion.query('SELECT fk_tienda_id, nombre, apellido  FROM trabajador_externo WHERE correo = ? AND contraseña = md5(?)', [correo, pass], (error, results_user) => {
                
                try{

                    conexion.query('SELECT * FROM tienda WHERE id_tienda = ?', [results_user[0].fk_tienda_id], (error, results) => {
                            if (error) {
                                throw error;
                            } else {
                                if (results.length > 0) {
                                    //ENTRA
                                    conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                                        conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                                            conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                                                conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                                                    res.render('login', {
                                                        alert: true,
                                                        alertTitle: 'Conexion exitosa',
                                                        alertMessage: 'Bienvenido! ',
                                                        alertIcon: 'success',
                                                        showConfirmButton: false,
                                                        timer: 1500,
                                                        ruta: 'productos',
                                                        user: req.session.user = results[0], //session 1 
                                                        trabajador: req.session.trabajador = results_user[0], //session 2
                                                        categoria: categoria, estado: estado, proveedores: proveedores, bodega: bodega
                                                    })
                                                    
                                                })
                                            })
                                        })
                                    })
                                }
                            }
                        })


                } catch (error) {

                    // Manejar el error de la consulta
                    res.render('login', {
                        alert: true,
                        alertTitle: 'Error',
                        alertMessage: 'Ocurrió un error al obtener los datos de la tienda.',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/'
                    });
                    
                }
            
        })
    }
}

exports.LoginSuperAdmin = (req, res) => {
    const rut = req.body.rut;
    const pass = req.body.password;
    if (rut && pass) {
        conexion.query('SELECT * FROM usuario WHERE rut = ? AND contrasena = SHA(?);', [rut, pass], (error, results) => {
            console.log(results[0])
            if (error) {
                throw error;
            } else {
                if (results.length > 0) {

                    //ENTRA

                    conexion.query('select * from tienda t JOIN estado_tienda e ON t.id_estado_tienda_fk = e.id_estado_tienda;', (error, tiendas)=>{
                        conexion.query('select * from tipo_tiendas;', (error, tipo_tiendas)=>{
                            conexion.query('select * from sector JOIN estado_sector ON sector.id_estado_sector_fk = estado_sector.id_estado_sector;', (error, sectores)=>{
                                res.render('loginS',{
                                    alert:true,
                                    alertTitle: 'Conexion exitosa',
                                    alertMessage: 'Bienvenido! ',
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'superadmin',
                                    superA: req.session.superA = results[0],
                                    tiendas: tiendas, tipo_tiendas: tipo_tiendas, sectores: sectores
                                })
                            })
                        })
                    })
                } else {
                    //NO ENTRA
                    res.render('loginS',{
                        alert:true,
                        alertTitle: 'Error',
                        alertMessage: 'Rut o Contraseña incorrectos!',
                        alertIcon: 'error',
                        showConfirmButton: true,
                        timer: false,
                        ruta: '/'
                    })
                }
            }
        })
    }

}


exports.savestore = (req, res) => {
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


    conexion.query('INSERT INTO tienda SET ?', {nombre_tienda:nombre,correo_tienda:email,pass_tienda:pass,slogan_tienda:slogan, banner_tienda:imagen, logo_tienda:logo,  horarios_tienda:horaio,id_tipo_fk: tipo, id_sector_fk: sector, id_estado_tienda_fk: 1}, (error, results)=>{
        
        if(error){
            throw error;
        } else {

            res.redirect('/')

        }
    })
}

exports.editestore = (req, res) => {
    const id = req.body.id;
    const nombre = req.body.name;
    const slogan = req.body.slogan;
    const logo = req.files?.['logo']?.[0]?.filename;
    const imagen = req.files?.['image']?.[0]?.filename;
    const horario = 'Lun-Vie: 9AM-8PM, Sáb-Dom: 10AM-6PM';
    const tipo = req.body.tipo;
    const sector = req.body.sector;
    
    const logoexistente = req.body.logoexistente;
    const bannerexistente = req.body.bannerexistente;
    
    let parametroLogo = '';
    let parametroBanner = '';

    if (logo !== undefined) {
        parametroLogo = logo;
        // console.log('parametroImagen :>> ', parametroImagen);
    }else{
        parametroLogo = logoexistente;
        // console.log('parametroImagen :>> ', parametroImagen);
    }

    if (imagen !== undefined) {
        parametroBanner = imagen;
        // console.log('parametroImagen :>> ', parametroImagen);
    }else{
        parametroBanner = bannerexistente;
        // console.log('parametroImagen :>> ', parametroImagen);
    }

    const ruta = 'registro';

    const query = `UPDATE tienda SET nombre_tienda = '${nombre}', slogan_tienda = '${slogan}', banner_tienda = '${parametroBanner}', logo_tienda = '${parametroLogo}', horarios_tienda = '${horario}', id_tipo_fk = '${tipo}', id_sector_fk = '${sector}' WHERE id_tienda = '${id}';`;

    conexion.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/superadmin');
        }
    });
}

exports.actualizarProducto = (req, res) => {

    
    const id_tienda = req.session.user.id_tienda;
    const id_producto = req.body.id;
    const nombre_producto = req.body.nombre_producto;
    const image = req.files?.['image']?.[0]?.filename;
    const precio_producto = req.body.precio_producto;
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    const id_estado_fk = req.body.id_estado_fk;
    const id_proveedor_fk = req.body.id_proveedor_fk;
    const imgBD = req.body.imgexistente;

    let parametroImagen = '';

    if (image !== undefined) {
        parametroImagen = image;
        // console.log('parametroImagen :>> ', parametroImagen);
    }else{
        parametroImagen = imgBD;
        // console.log('parametroImagen :>> ', parametroImagen);
    }

    conexion.query('UPDATE productos SET ? WHERE id_producto = ?', [{ nombre_producto: nombre_producto, imagen_producto: parametroImagen, precio_producto: precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk: id_estado_fk, id_tienda_fk: id_tienda, id_proveedor_fk: id_proveedor_fk }, id_producto], (error, results) => {
        
        if (error) {
            throw error;
        } else {
            conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
                conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
                    conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                            conexion.query('SELECT * FROM productos WHERE id_producto = ?', [id_producto], (error, producto) => {
                                res.render('editar_productos', {
                                    alert: true,
                                    alertTitle: 'Producto actualizado',
                                    alertMessage: 'Se ha actualizado correctamente el producto',
                                    alertIcon: 'success',
                                    showConfirmButton: false,
                                    timer: 1500,
                                    ruta: 'productos',
                                    user: req.session.user,
                                    categoria: categoria,
                                    estado: estado,
                                    trabajador: req.session.trabajador,
                                    proveedores: proveedores,
                                    producto: producto
                                })

                            })
                    })
                })
            })
        }
    })
}

exports.buscarTienda = (req, res) => {
    //RUTA PARA EL PORTAL DE TIENDAS
    const comparacion = req.body.comparacion;
    conexion.query(`SELECT * FROM tienda WHERE nombre_tienda LIKE '%${comparacion}%'`, (error, tiendas) => {
        if (error) {
            throw error;
        } else {
            res.render('portal_tiendas', { tiendas: tiendas });
        }
    })

}

function generarCodigo() {
    // Generar letras aleatorias
    var letras = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (var i = 0; i < 3; i++) {
        letras += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    // Generar números aleatorios
    var numeros = '';
    for (var j = 0; j < 3; j++) {
        numeros += Math.floor(Math.random() * 10);
    }

    // Combinar letras y números en el formato AAA-231
    var codigo = letras + '-' + numeros;

    return codigo;
}

exports.cajaCompletada = (req, res) => {
    
    const rut = req.body.rut;
    const cadenaObjeto = req.body.inputcarrito;
    const objetoProductos = JSON.parse(cadenaObjeto);
    const codigoBoleta = generarCodigo();
    const idtienda = req.body.idtienda;
    var fechaActual = new Date();
  
    const updateQueries = Object.keys(objetoProductos).map((producto) => {
      return new Promise((resolve, reject) => {
        const { id, cantidad, precioTotal } = objetoProductos[producto];
        const sql = `UPDATE productos SET stock = stock - ${cantidad} WHERE id_producto = ${id}`;
  
        conexion.query(sql, (err, result) => {
          if (err) {
            console.error('Error al actualizar el stock:', err);
            reject(err);
          } else {
            const ventaQuery = `INSERT INTO venta_tienda SET ?`;
            const ventaData = {
              codigo_boleta: codigoBoleta,
              rut_cliente: rut,
              id_productos_fk: id,
              cantidad: cantidad,
              total: precioTotal,
              fecha_venta: fechaActual,
              id_tienda_fk: idtienda
            };
  
            conexion.query(ventaQuery, ventaData, (error, resultss) => {
              if (error) {
                reject(error);
              } else {
                resolve();
              }
            });
          }
        });
      });
    });
  
    Promise.all(updateQueries)
      .then(() => {
        const tiendaQuery = 'SELECT * FROM tienda WHERE id_tienda = ?';
        const productosQuery = `SELECT * FROM productos 
          INNER JOIN estado_producto ON estado_producto.id_estado_producto = productos.id_estado_fk 
          INNER JOIN proveedores ON proveedores.id_proveedor = productos.id_proveedor_fk 
          INNER JOIN categoria_producto ON categoria_producto.id_categoria_producto = productos.id_categoria_producto_fk 
          INNER JOIN tienda ON tienda.id_tienda = productos.id_tienda_fk 
          WHERE tienda.id_tienda = ? and productos.id_estado_fk = 1`;
  
        conexion.query(tiendaQuery, [idtienda], (error, tienda) => {
          if (error) {
            throw error;
          } else {
            conexion.query(productosQuery, [idtienda], (error, productos) => {
              if (error) {
                throw error;
              } else {
                res.render('cargando', {
                  alert: true,
                  alertTitle: 'Producto actualizado',
                  alertMessage: 'Se ha actualizado correctamente el producto',
                  alertIcon: 'success',
                  showConfirmButton: false,
                  timer: 1500,
                  ruta: 'caja_productos/' + idtienda,
                  user: req.session.user,
                  productos: productos,
                  tienda: tienda
                });
              }
            });
          }
        });
      })
      .catch((error) => {
        console.error('Error:', error);
        res.status(500).send('Error interno del servidor');
      });
  };
  



exports.editHabitacion = (req, res) => {
    const idHabitacion = req.body.id;
    const numero = req.body.numero;
    const estadoHabitacion = req.body.estado_habitacion;
    const descripcion = req.body.descripcion;
    const precioHora = req.body.precio;
    const idSector_fk = req.body.sector;
    const imagenHabitacion = req.files?.['image']?.[0]?.filename;
    const imgBD = req.body.imgexistente;

    let parametroImagen = '';

    if (imagenHabitacion !== undefined) {
        parametroImagen = imagenHabitacion;
        // console.log('parametroImagen :>> ', parametroImagen);
    }else{
        parametroImagen = imgBD;
        // console.log('parametroImagen :>> ', parametroImagen);
    }

    const query = `UPDATE habitaciones SET numero = '${numero}', estado_habitacion_fk = '${estadoHabitacion}', descripcion = '${descripcion}', precio_hora = '${precioHora}', id_sector_fk = '${idSector_fk}', image = '${parametroImagen}' WHERE id_habitacion = '${idHabitacion}';`;

    conexion.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/ver_habitaciones_admin');
        }
    });
}

exports.createHabitacion = (req, res) => {

    const numero = req.body.numero;
    const estadoHabitacion = 1;
    const descripcion = req.body.descripcion;
    const precioHora = req.body.precio;
    const idSector = req.body.sector;
    const imagenHabitacion = req.files['image'][0].filename;

    const query = `INSERT INTO habitaciones (numero, estado_habitacion_fk, descripcion, precio_hora, id_sector_fk, image) VALUES ('${numero}', '${estadoHabitacion}', '${descripcion}', '${precioHora}', '${idSector}', '${imagenHabitacion}')`;

    conexion.query(query, (error, results) => {
        if (error) {
            throw error;
        } else {
            res.redirect('/ver_habitaciones_admin');
        }
    });
}