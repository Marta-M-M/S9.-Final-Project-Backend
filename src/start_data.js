import User from './models/userModel.js';
import Event from './models/eventsModel.js';

const insertInitialUserData = async () => {

  const userData = [
    { email: 'ismael.academy@gmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'Ismael', }, //pass: ismael123
    { email: 'laura@hotmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'Laura' },
    { email: 'maria@hotmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'Maria', surname: 'kale' },
    { email: 'carlsen@hotmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'Magnus', surname: 'Carlsen', age: 36, role: 'teacher'},
    { email: 'hola@gmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'Maria', surname: 'lopez', age: 0, role: 'teacher'}, //pass: holacomoestas
    { email: 'jp@gmail.com', password: '$2b$10$tXrqo7VdSPCLAsIUhrVsYejYeMt9FLo9J4OchgCKwuDvpeDK6Xf1q', name: 'judith', surname: 'polgar', age: 42, role: 'teacher'} //pass: judithpolgar1
  ];
  // Insertar datos con opción ignoreDuplicates
  // Para actualizar todas las filas: updateOnDuplicate: Object.keys(User.rawAttributes)
  await User.bulkCreate(userData, { ignoreDuplicates: true });

  const eventData = [

    { title: 'Iniciación: Movimiento de piezas', description: 'Explicación del tablero, nombre de las piezas, su valor y cómo se mueven', teacher_id: 1 },
    { title: 'Iniciación a las aperturas', description: 'Explicación de que es una apertura y ejemplo de la apretura Ruy López', teacher_id: 3 },
    { title: 'Clase de finales', description: 'Explicación de final de torres contra rey', teacher_id: 2 },
    { title: 'Clase de medio juego', description: 'Explicación de estrategias en el medio juego', teacher_id: 2, f_ini: '2024-03-17 14:32:01', f_fin: '2024-03-17 15:32:01', capacity: 12, created_at: '2024-03-17 14:32:01', updated_at: '2024-03-17 14:32:01'}
  ];
  // Insertar datos con opción ignoreDuplicates
  await Event.bulkCreate(eventData, { ignoreDuplicates: true });
}

export { insertInitialUserData };
