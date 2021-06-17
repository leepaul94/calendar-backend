const { Router } = require('express');
const { check } = require('express-validator');
const { getEvents, createEvent, updateEvent, deleteEvent } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

/*
    Event Route
    /api/events
*/


// Todas tienen que pasar por la validacion del JWT
router.use( validarJWT ); // todas las rutas debajo estan protegidas porque se necesita del token

// Obtener eventos
router.get('/', getEvents);

// Crear un nuevo evento
router.post(
    '/',   
    [
        check('title', 'El titulo es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha de finalizacion es obligatoria').custom( isDate ),
        validarCampos
    ],
    createEvent 
);

// Actualizar evento
router.put(
    '/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    updateEvent 
);

// Eliminar evento
router.delete('/:id', deleteEvent );

module.exports = router; 