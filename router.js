const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/caja_productos/:id', (req, res)=>{
    
    const id = req.params.id;

    conexion.query('SELECT * FROM tienda WHERE id_tienda = ?', [id], (error,tienda)=>{
        conexion.query('SELECT * FROM productos WHERE id_tienda_fk = ?', [id],(error,productos)=>{ 

            if (error) {
                throw error;
            } else {
                res.render('caja_productos', { tienda : tienda, productos : productos, user : req.session.user });
            }
        })
    })
})

router.get('/registro', (req, res) => {

    conexion.query('SELECT * FROM tipo_tiendas', (error, tipotienda) => {
        conexion.query('SELECT * FROM sector', (error, sector) => {

            if (error) {
                throw error;
            } else {
                res.render('registro', { sector: sector, tipotienda: tipotienda , user : req.session.user });
            }

        });

    });
});


//RUTA PARA EL PORTAL DE TIENDAS
router.get('/portal_tiendas', (req, res)=>{
    conexion.query('SELECT * FROM tienda', (error, tiendas)=>{
        if(error){
            throw error;
        }else{
            res.render('portal_tiendas', {tiendas:tiendas});
        }
    })
})

router.get('/index_tienda/:id', (req, res)=>{
    
    const id = req.params.id;

    conexion.query('SELECT * FROM tienda WHERE id_tienda = ?', [id], (error,tienda)=>{
        conexion.query('SELECT * FROM productos WHERE id_tienda_fk = ?', [id],(error,productos)=>{ 

            if (error) {
                throw error;
            } else {
                res.render('index_tienda', { tienda : tienda, productos : productos, user : req.session.user });
            }
        })
    })
})

router.get('/ver_productos/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT * FROM productos INNER JOIN estado_producto ON estado_producto.id_estado_producto = productos.id_estado_fk INNER JOIN proveedores ON proveedores.id_proveedor = productos.id_proveedor_fk INNER JOIN categoria_producto ON categoria_producto.id_categoria_producto = productos.id_categoria_producto_fk INNER JOIN tienda ON tienda.id_tienda = productos.id_tienda_fk WHERE tienda.id_tienda = ? and productos.id_estado_fk = 1', [id] ,(error, results) => {
        
            if (error) {
                throw error;
            } else {
                res.render('ver_productos', { results: results, user : req.session.user});
            }
    });
});

router.get('/productos', (req, res)=>{


    conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
        conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
            conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                conexion.query('SELECT * FROM bodega ', (error, bodega) => {

                    res.render('crear_producto',{categoria:categoria,estado:estado,proveedores:proveedores, bodega:bodega, user : req.session.user});
                    // console.log('catego :>> ', categoria);
                    // console.log('estado :>> ', estado);
                    // console.log('proveedores :>> ', proveedores);

                })
            })
        })
    })

})

router.get('/logout',  (req, res)=>{

    req.session.destroy((err) => {
        if (err) {
          console.log(err);
        } else {
          res.redirect('/'); // Redirige a la página de inicio de sesión u otra página adecuada
        }
    });

})
router.get('/itinerario',  (req, res)=>{

    conexion.query('SELECT pe.numero AS puerta_embarque, ca.nombre AS compania_aerea, v.numero_vuelo, ao.nombre AS aeropuerto_origen, ao.ciudad AS ciudad_origen ,ad.nombre AS aeropuerto_destino, ad.ciudad AS ciudad_destino, estado_vuelo FROM Vuelos v JOIN Aeropuerto ao ON v.aeropuerto_origen_id = ao.id JOIN Aeropuerto ad ON v.aeropuerto_destino_id = ad.id JOIN CompañiaAerea ca ON v.compañia_id = ca.id JOIN PuertaEmbarque pe ON v.puerta_embarque_id = pe.id GROUP BY numero_vuelo', (error, results)=>{


        res.render('itinerario', {results:results}); 


    })
    
})
//RUTA PARA EDITAR PRODUCTO
router.get('/editar_producto/:id', (req, res)=>{
    const id = req.params.id;

    conexion.query('SELECT * FROM categoria_producto ', (error, categoria) => {
        conexion.query('SELECT * FROM estado_producto ', (error, estado) => {
            conexion.query('SELECT * FROM proveedores ', (error, proveedores) => {
                conexion.query('SELECT * FROM bodega ', (error, bodega) => {
                    conexion.query('SELECT * FROM productos WHERE id_producto = ?',[id],(error, producto)=>{
                        
                        res.render('editar_productos',{categoria:categoria,estado:estado,proveedores:proveedores,producto:producto[0], bodega:bodega, user : req.session.user});
                        // console.log('catego :>> ', categoria);
                        // console.log('estado :>> ', estado);
                        // console.log('proveedores :>> ', proveedores);
                        //console.log('productos :>> ', producto);
                        
                    })
                })
            })
        })
    })

})

//RUTA PARA ELIMINAR PRODUCTO
router.get('/deleteProducto/:id', (req, res)=>{
    const tienda = req.session.user.id_tienda;
    const id = req.params.id;
    conexion.query('UPDATE productos SET id_estado_fk = 2 WHERE id_producto = ? ', [id], (error)=>{
        //console.log('ID DE LA TIENDA',tienda);
        if(error){
            throw error;
        }else{
            res.redirect('/ver_productos/'+req.session.user.id_tienda)
        }
    })
})
//RUTA PARA VER PRODUCTOS ELIMINADOS
router.get('/ver_productosDes/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT * FROM productos INNER JOIN estado_producto ON estado_producto.id_estado_producto = productos.id_estado_fk INNER JOIN proveedores ON proveedores.id_proveedor = productos.id_proveedor_fk INNER JOIN categoria_producto ON categoria_producto.id_categoria_producto = productos.id_categoria_producto_fk INNER JOIN tienda ON tienda.id_tienda = productos.id_tienda_fk WHERE tienda.id_tienda = ? and productos.id_estado_fk = 2', [id] ,(error, results) => {
        
            if (error) {
                throw error;
            } else {
                res.render('ver_productosDes', { results: results, user : req.session.user});
            }
    });
});


//RUTA PARA VER PRODUCTOS ELIMINADOS
router.get('/ver_ventas/:id', (req, res) => {

    const id = req.params.id;

    conexion.query('SELECT venta_tienda.id_venta_tienda, venta_tienda.codigo_boleta, venta_tienda.cantidad, venta_tienda.total, productos.nombre_producto, DATE_FORMAT(venta_tienda.fecha_venta, "%m/%d/%Y") AS fecha_venta  FROM venta_tienda INNER JOIN productos ON productos.id_producto = venta_tienda.id_productos_fk  WHERE venta_tienda.id_tienda_fk = ? ', [id] ,(error, results) => {
        
            if (error) {
                throw error;
            } else {
                res.render('vista_ventas', { results: results, user : req.session.user});
            }
    });

});

//RUTA PARA HABILITAR PRODUCTOS

router.get('/habilitar_producto/:id', (req, res)=>{
    const tienda = req.session.user.id_tienda;
    const id = req.params.id;
    conexion.query('UPDATE productos SET id_estado_fk = 1 WHERE id_producto = ? ', [id], (error)=>{
        //console.log('ID DE LA TIENDA',tienda);
        if(error){
            throw error;
        }else{
            res.redirect('/ver_productos/'+req.session.user.id_tienda)
        }
    })
})


const crud = require('./controllers/crud');

router.post('/GuardarProducto', crud.GuardarProducto);
router.post('/savestore',crud.savestore);
router.post('/login', crud.login);
router.post('/actualizarProducto', crud.actualizarProducto);
router.post('/buscarTienda', crud.buscarTienda);

module.exports = router;