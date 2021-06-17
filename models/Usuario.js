const { Schema, model } = require('mongoose'); // importo y extrigo el schema y el model

// El schema es la info que se va a grabar
const UsuarioSchema = Schema({
    name: {
        type: String,
        required: true // significa que es obligatorio
    },
    email: {
        type: String,
        required: true,
        unique: true // que sea unico el mail, que no haya duplicados
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = model('Usuario', UsuarioSchema);