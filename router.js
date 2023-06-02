const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/registro', (req, res)=>{
    res.render('registro')
})

router.get('/index_tienda', (req, res)=>{
    res.render('index_tienda')
})

const crud = require('./controllers/crud');
// router.post('/', crud.validacion);

module.exports = router;