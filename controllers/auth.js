const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');



const crearUsuario = async(req, res = response ) => { 
    // necesito responderle al cliente. Cuando alguien solicite esto, le tengo que responder algo que quiero
    
    const { email, password } = req.body; // recibo la info
    
    try {
        // validacion del email
        let usuario = await Usuario.findOne({ email }); // es una promesa que se fija si ya hay un objeto con dicho mail

        if( usuario ) { // si el usuario ya existe, me retorne este error
            return res.status(400).json({
                ok:false,
                msg: 'Un usuario ya existe con ese correo'
            });
        }

        usuario = new Usuario( req.body ); // se crea una nueva instancia de mi usuario y le mando mi req.body que tiene toda la info de name, email, password

        // Encriptar constraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );
        

        await usuario.save(); // se guarda la info en la base de datos
        // Mongoose ya sabe que estructura tiene, que valores me interesan y va a ignorar todo lo adicional que yo no le dije que iba a tener

        // Generar JWT
        const token = await generarJWT( usuario.id, usuario.name);

        // respuesta a la peticion
        res.status(201).json({ // json porque estoy mandando un objeto
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        console.log(error); // esto solo se ve en los logs del servidor
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador' // es el mensaje para el cliente
        })
    }
    
};

const loginUsuario = async(req, res = response ) => { 
    
    const { email, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ email }); // es una promesa que se fija si ya hay un objeto con dicho mail

        if( !usuario ) { // si el usuario no existe, me retorne este error
            return res.status(400).json({
                ok:false,
                msg: 'El usuario no existe con ese email'
            });
        }

        // Confirmar los password
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if( !validPassword ) { // si la contra no es valida, no es la misma
            return res.status(400).json({
                ok:false,
                msg: 'Password incorrecto'
            });
        }

        // Generar nuestro JWT
        const token = await generarJWT( usuario.id, usuario.name);

        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })

    } catch (error) {
        console.log(error); // esto solo se ve en los logs del servidor
        res.status(500).json({
            ok: false, 
            msg: 'Por favor hable con el administrador' // es el mensaje para el cliente
        })
    }
};

const revalidarToken = async(req, res = response ) => { 
    
    const { uid, name } = req

    // generar un nuevo JWT y retornarlo en esta peticion
    const token = await generarJWT( uid, name);

    res.json({ 
        ok: true,
        uid, 
        name,
        token, 
    })
};

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
};