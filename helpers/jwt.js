const jwt = require('jsonwebtoken');

const generarJWT = ( uid, name ) => {

    return new Promise( (resolve, reject) => {

        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {

            if( err ){ // si hay algun error
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve(token); // si no hay ningun error, resuelvo con el token

        } )

    })


}

module.exports = {
    generarJWT
}