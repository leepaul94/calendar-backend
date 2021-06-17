/*
    Rutas de Usuarios / Auth
    host + /api/auth
*/

const { Router } = require('express'); // importamos express y extraemos router
const { check } = require('express-validator');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();


// endpoints
// router.get('/new', (req, res) => { //get es un tipo de peticion. el '/' es lo que esta esperando y el segundo arg es un callback que se ejecuta con varios argumentos: la request y la response
//     // necesito responderle al cliente. Cuando alguien solicite esto, le tengo que responder algo que quiero
//     res.json({ // json porque estoy mandando un objeto
//         ok: true
//     })
// });

router.post(
    '/new',
    [ // middlewares de express para validaciones de la info que recibo del front. Se pone entre corchetes porque pueden ser varios los middlewares que mande.
        check('name', 'El nombre es obligatorio').not().isEmpty(), // el nombre es obligatorio y que no este vacio
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos // importamos el middleware y se coloca luego de los checks
    ],
    crearUsuario ); //post es un tipo de peticion para realizar posteo de info. Lo uso para crear un nuevo usuario. el '/' es lo que esta esperando y el segundo arg es un callback que se ejecuta con varios argumentos: la request y la response

router.post(
    '/',
    [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 }),
        validarCampos
    ],
    loginUsuario );

router.get('/renew', validarJWT, revalidarToken);


module.exports = router;
