import { Router } from 'express';
import { enrollStudent, cancelEnrollment } from '../controllers/inscriptionsController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
const router = Router();

// Ruta para inscribir a un estudiante en un evento
router.post('/:event_id/enroll', authenticateToken, enrollStudent);

// Ruta para cancelar la inscripción de un estudiante en un evento
router.delete('/:event_id/cancel', authenticateToken, cancelEnrollment);

export default router;

