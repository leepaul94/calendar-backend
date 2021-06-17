const moment = require('moment');

const isDate = ( value ) => {

    if( !value ) { // validacion si el campo es correcto o no
        return false;
    }

    const fecha = moment( value ); // el value lo va a establecer en moment y me va a indicar a mi si es un fecha correcta o no
    if( fecha.isValid() ) { // si la fecha es valida
        return true;
    } else {
        return false;
    }


}


module.exports = {
    isDate
}