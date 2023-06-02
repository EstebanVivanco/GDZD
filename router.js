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

router.get('/ver_productos', (req, res) => {
    conexion.query('SELECT * FROM productos;', (error, results) => {
        
            if (error) {
                throw error;
            } else {
                res.render('ver_productos', { results: results, results2: results2 });
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