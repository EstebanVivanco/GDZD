const express = require('express');
const conexion = require('./database/bd');
const router = express.Router();

router.get('/',  (req, res)=>{
    res.render('login');
})

router.get('/registro', (req, res)=>{
    res.render('registro')
})

const crud = require('./controllers/crud');
// router.post('/', crud.validacion);

module.exports = router;