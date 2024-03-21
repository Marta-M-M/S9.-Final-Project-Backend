// src/routes/userRoutes.js
import { Router } from 'express';
import { getUserById, uploadPhoto, getListFiles, downloadPhoto } from '../controllers/userController.js';
import authenticateToken from '../middlewares/authenticateToken.js';
import { idValidator, nameValidator } from '../validations/generic.Validation.js'


const router = Router();

// Rutas para obtener y modificar los datos de los usuarios
router.get('/',(req,res)=>{
    res.send("Hello World form NodeJS express.");
  });
router.get('/:id', authenticateToken, idValidator, getUserById);
router.post("/upload", authenticateToken, uploadPhoto);
router.get("/files",  authenticateToken, getListFiles);
router.get("/files/:name", authenticateToken, nameValidator, downloadPhoto);

export default router;
