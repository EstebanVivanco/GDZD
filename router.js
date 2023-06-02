const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/registro', (req, res) => {
    conexion.query('SELECT * FROM sector;', (error, results2) => {
        conexion.query('SELECT * FROM tipo_tiendas;', (error, results) => {

            if (error) {
                throw error;
            } else {
                res.render('registro', { results: results, results2: results2 });
            }

        });
    });
});


router.get('/index_tienda/:id', (req, res)=>{
    
    const id = req.params.id;

    conexion.query('SELECT * FROM tienda WHERE id_tienda = ?', [id], (error,tienda)=>{
        conexion.query('SELECT * FROM productos WHERE id_tienda_fk = ?', [id],(error,productos)=>{ 

            if (error) {
                throw error;
            } else {
                res.render('index_tienda', { tienda : tienda, productos : productos });
            }
        })
    })
})

const crud = require('./controllers/crud');
router.get('/ver_productos', (req, res) => {

    conexion.query('SELECT * FROM productos INNER JOIN estado_producto ON estado_producto.id_estado_producto = productos.id_estado_fk INNER JOIN proveedores ON proveedores.id_proveedor = productos.id_proveedor_fk INNER JOIN categoria_producto ON categoria_producto.id_categoria_producto = productos.id_categoria_producto_fk', (error, results) => {
        
            if (error) {
                throw error;
            } else {
                res.render('ver_productos', { results: results});
            }

    });
});

router.get('/productos', (req, res)=>{
    res.render('crear_producto')
})

const crud = require('./controllers/crud');
router.post('/GuardarProducto', crud.GuardarProducto);
router.post('/savestore',crud.savestore);

module.exports = router;