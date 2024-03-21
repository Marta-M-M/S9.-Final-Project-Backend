
import { Router } from 'express';
// import * as eventsController from '../controllers/eventsController.js';
import { authorizeTeacher } from '../middlewares/authorizeTeacher.js';
import { getEvents, createEvent, updateEvent, deleteEvent, getInscriptionsCount } from '../controllers/eventsController.js'
import authenticateToken from '../middlewares/authenticateToken.js';
import { eventValidator } from '../validations/event.Validation.js';
//importar las validacionesa usar!!
const router = Router();


//ENDPOINTS
router.get('/', getEvents); // authenticateToken, authorizeTeacher,
// Crear un nuevo evento (requiere autorización de profesor)
router.post('/', eventValidator, createEvent); //authenticateToken, authorizeTeacher,
// Actualizar un evento existente (requiere autorización de profesor)
router.put('/:id', eventValidator, updateEvent); //authenticateToken, authorizeTeacher,
// Eliminar un evento existente (requiere autorización de profesor)
router.delete('/:id', deleteEvent); //,authenticateToken, authorizeTeacher,
// Obtener la cantidad de alumnos inscritos en un evento específico (requiere autorización de profesor)
router.get('/:id/inscriptions/count', authenticateToken, authorizeTeacher, getInscriptionsCount);

export default router;



