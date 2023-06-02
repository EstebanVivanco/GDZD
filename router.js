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

const crud = require('./controllers/crud');

// router.post('/', crud.validacion);
router.post('/savestore',crud.savestore);

module.exports = router;