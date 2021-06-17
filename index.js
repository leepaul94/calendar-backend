const express = require('express'); // es parecido a hacer una importancion
require('dotenv').config();
const { dbConnection } = require('./database/config');
const cors = require('cors');


// Crear el servidor de Express
const app = express(); // producto de express. Es como una funcion pero en express.

// Base de datos
dbConnection();

// CORS
app.use(cors());

// Quiero que cuando se entre al 'localhost:4000/', vaya al directorio publico
// Directorio Publico
app.use( express.static('public') ); //middleware para establecer un directorio publico

// Lectura y parseo del body
app.use( express.json() ); // hay que hacer pasar todas las peticiones a otro middleware. Las peticiones que vengan en formato json las proceso aca y extraigo su contenido

// Rutas
app.use('/api/auth', require('./routes/auth')); // todo lo que el archivo auth (segundo argumento) va a exportar lo va a habilitar en la ruta escrita como primer argumento
// TODO: CRUD: Eventos
app.use('/api/events', require('./routes/events'));


// Escuchar peticiones
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${ process.env.PORT }`);
}); // El primer argumento es el puerto donde quiero que este corriendo. El segundo es un callback que se va a ejecutar cuando el servidor de express este arriba
