const {response} = require('express');
const { validationResult } =require('express-validator');

const validarCampos = (req, res = response, next) => {

    // manejo de errores
    const errors = validationResult( req );
    if( !errors.isEmpty() ) { // si en errors no esta vacio, retorno el error
        return res.status(400).json({ 
            ok: false,
            errors: errors.mapped() // muestra los errores que disparan los checks
        })
    }

    next();
}

module.exports = {
    validarCampos
}