import { validationResult } from 'express-validator';
import Inscription from '../models/inscriptionsModel.js';
//MODIFICAR ¡/ACTUALIZAR PARA INTEGRAR CALENDARIO
// Controlador para inscribir a un estudiante en un evento
export const enrollStudent = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { event_id } = req.params;
    const student_id = req.user.id_user; // Obtener el ID del estudiante desde el token de autenticación

    // Comprobar si el estudiante ya está inscrito en el evento
    const existingInscription = await Inscription.findOne({
      where: { event_id, student_id }
    });

    if (existingInscription) {
      return res.status(400).json({
        code: -1,
        message: 'El estudiante ya está inscrito en este evento'
      });
    }

    // Crear una nueva inscripción para el estudiante en el evento
    const newInscription = await Inscription.create({
      event_id,
      student_id,
      is_paid: 0 // Por defecto, la inscripción no está pagada lo cambio de false a 0. Siempre saldrá no pagada si quiero que salga según lo que me ponga el usuario debere de
                  /*const is_paid = req.body.is_paid === '1' ? 1 : 0;
                  const newInscription = await Inscription.create({
                   event_id,
                  student_id,
                  is_paid
                  }); */
    });

    res.status(200).json({
      code: 1,
      message: 'Estudiante inscrito correctamente en el evento',
      data: newInscription
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al inscribir al estudiante en el evento'
    });
  }
};

// Controlador para cancelar la inscripción de un estudiante en un evento
export const cancelEnrollment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { event_id } = req.params;
    const student_id = req.user.id_user; // Obtener el ID del estudiante desde el token de autenticación

    // Buscar la inscripción del estudiante en el evento
    const inscription = await Inscription.findOne({
      where: { event_id, student_id }
    });

    if (!inscription) {
      return res.status(404).json({
        code: -1,
        message: 'El estudiante no está inscrito en este evento'
      });
    }

    // Eliminar la inscripción
    await inscription.destroy();

    res.status(200).json({
      code: 1,
      message: 'Inscripción cancelada correctamente'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      code: -100,
      message: 'Ha ocurrido un error al cancelar la inscripción del estudiante en el evento'
    });
  }
};
