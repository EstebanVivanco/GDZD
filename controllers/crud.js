const router = require('../router');
const { query } = require('../database/bd');
const conexion = require('../database/bd');

exports.GuardarProducto =(req, res)=>{

    //ID TIENDA
    const id_tienda = 1;

    const nombre_producto = req.body.nombre_producto;
    const imagen_producto = req.file.filename;
    const stock = req.body.stock;
    const precio_producto = req.body.precio_product;
    const id_categoria_producto_fk = req.body.id_categoria_producto_fk;
    const id_estado_fk = req.body.id_estado_fk;
    const id_bodega_fk = req.body.id_bodega_fk;
    const id_proveedor_fk = req.body.id_proveedor_fk;

    conexion.query('INSERT INTO productos VALUES ?', [{nombre_producto:nombre_producto , imagen_producto: imagen_producto, stock:stock, precio_producto:precio_producto, id_categoria_producto_fk: id_categoria_producto_fk, id_estado_fk:id_estado_fk, id_estado_fk:id_estado_fk, id_bodega_fk:id_bodega_fk, id_proveedor_fk:id_proveedor_fk}, id_tienda ], (error, results)=>{

        res.render('/');
        
    })

}