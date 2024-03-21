// Middleware para autorizar a los profesores
export const authorizeTeacher = (req, res, next) => {
  console.log(req.user.role);
    // Verificar si el usuario está autenticado y tiene el rol de profesor
    if (req.user && req.user.role === 'teacher') {
      next(); // El usuario es un profesor, permitir la solicitud
    } else {
      // Si el usuario no es un profesor, enviar una respuesta de acceso denegado
      res.status(403).json({
        code: -403,
        message: 'Acceso denegado. Solo los profesores tienen permiso para realizar esta acción.'
      });
    }
  };
  
  export default authorizeTeacher;