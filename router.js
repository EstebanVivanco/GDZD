const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/registro', (req, res)=>{
    res.render('registro')
})

router.get('/productos', (req, res)=>{
    res.render('crear_recompensa')
})

const crud = require('./controllers/crud');
router.post('/GuardarProducto', crud.GuardarProducto);

module.exports = router;