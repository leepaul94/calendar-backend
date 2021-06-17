const mongoose = require('mongoose');


const dbConnection = async() => {

    try {
        
        await mongoose.connect( process.env.DB_CNN , {
            useNewUrlParser: true, // cofig requeridas
            useUnifiedTopology: true,
            useCreateIndex: true
        }); // la cadena de conexion puede cambiar entonces tengo que hacer un nuevo environment en .env

        console.log('DB Online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar BD');

    }
}

module.exports = {
    dbConnection
}