import { validationResult } from 'express-validator';
import Event from '../models/eventsModel.js';
import Inscription from '../models/inscriptionsModel.js';

// Obtener todos los eventos
export const getEvents = async (req, res) => {
  try {
    const events = await Event.findAll();
   
   // Mapear los eventos a un formato compatible con FullCalendar, cada evento se convierte a un objeto con propiedades como id, title, etc -->INTEGRAR FULLCALENDER!
   const formattedEvents = events.map(event => {
    return {
      id: event.id_event,
      title: event.title,
      start: event.f_ini,
      end: event.f_fin,
      capacity: event.capacity,
      description: event.description
    };
  });

    res.status(200).json({
      code: 1,
      message: 'Lista de eventos',
      data: events
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener los eventos'
    });
  }
};

// Crear un nuevo evento
export const createEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, f_ini, f_fin, capacity } = req.body;
    
    //modifico para hacer ruta no autenticada
    // let teacher_id = null;
  
    // // Verificar si el usuario está autenticado
    // if (req.user) {
    //   teacher_id = req.user.id_user; // Obtener el ID del profesor autenticado
    // }

    //defino el teacher_id directamente
    const teacher_id = 62;
    
    //Volver a poner al hacer el login y el register
    // const teacher_id = req.user.id_user; // Obtener el ID del profesor autenticado //id_user undefined si quito la autentificación
    
    const newEvent = await Event.create({ title, description, f_ini, f_fin, capacity, teacher_id });

    res.status(200).json({
      code: 1,
      message: 'Evento creado exitosamente',
      data: newEvent
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al crear el evento'
    });
  }
};

// Actualizar un evento existente
export const updateEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { title, description, f_ini, f_fin, capacity } = req.body;

    const event = await Event.findByPk(id);
    if (!event) {
      return res.status(404).json({
        code: -3,
        message: 'Evento no encontrado'
      });
    }

    // Actualizar los detalles del evento
    event.title = title;
    event.description = description;
    event.f_ini = f_ini;
    event.f_fin = f_fin;
    event.capacity = capacity;

    await event.save();

    res.status(200).json({
      code: 1,
      message: 'Evento actualizado exitosamente',
      data: event
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al actualizar el evento'
    });
  }
};

// Eliminar un evento existente
export const deleteEvent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    const deletedEvent = await Event.destroy({ where: { id_event: id } });
    if (!deletedEvent) {
      return res.status(404).json({
        code: -100,
        message: 'Evento no encontrado'
      });
    }

    res.status(200).json({
      code: 1,
      message: 'Evento eliminado exitosamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al eliminar el evento'
    });
  }
};

// Obtener la cantidad de alumnos inscritos en un evento
export const getInscriptionsCount = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;

    // Contar el número de inscripciones para un evento específico
    const count = await Inscription.count({ where: { event_id: id } });

    res.status(200).json({
      code: 1,
      message: 'Cantidad de alumnos inscritos',
      data: count
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al obtener la cantidad de alumnos inscritos'
    });
  }
};
