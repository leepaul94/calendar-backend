const { response } = require("express");
const Event = require("../models/Event");



const getEvents = async(req, res = response) => {

    const events = await Event.find() //quiero traer toda la info
                              .populate('user', 'name');  

    res.json({

        ok: true,
        events: events

    });

};

const createEvent = async(req, res = response) => {

    // verificar que tenga el evento.
    const event = new Event( req.body );

    try {

        event.user = req.uid;
        
        const eventSaved = await event.save();

        res.json({
            ok: true, 
            event: eventSaved
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });

    }

};

const updateEvent = async(req, res = response) => {

    const eventId = req.params.id; //obtengo el id del evento del url

    try {

        const event = await Event.findById( eventId );
        const uid = req.uid;

        if( !event) { // si el evento no existe
            return res.status(404).json({ // 404 cuando un elemento en internet no existe
                ok: false, 
                msg: 'Evento no existe con ese id'
            })
        }

        if( event.user.toString() !== uid ){ //si es diferente los uids
            return res.status(401).json({ // 401 si alguien no esta autorizado a hacer algo
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const newEvent = {
            ...req.body, // todo lo que mande 
            user: uid // en la peticion no viene el id del usuario
        };

        const updatedEvent = await Event.findByIdAndUpdate( eventId, newEvent, { new: true } ); // busque el id (primer arg) y lo actualice (segundo arg) y que siempre muestre la ultima actualizacion

        res.json({
            ok: true,
            event: updatedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

const deleteEvent = async(req, res = response) => {

    const eventId = req.params.id; //obtengo el id del evento del url

    try {

        const event = await Event.findById( eventId );
        const uid = req.uid;

        if( !event) { // si el evento no existe
            return res.status(404).json({ // 404 cuando un elemento en internet no existe
                ok: false, 
                msg: 'Evento no existe con ese id'
            })
        }

        if( event.user.toString() !== uid ){ //si es diferente los uids
            return res.status(401).json({ // 401 si alguien no esta autorizado a hacer algo
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const deletedEvent = await Event.findByIdAndDelete( eventId ); // busque el id (primer arg) y lo actualice (segundo arg) y que siempre muestre la ultima actualizacion

        res.json({
            ok: true,
            event: deletedEvent
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

}

module.exports = {
    getEvents,
    createEvent,
    updateEvent,
    deleteEvent
};