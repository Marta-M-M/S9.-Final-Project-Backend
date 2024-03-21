import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
import Inscription from './inscriptionsModel.js';

const Event = sequelize.define('Event', {
    id_event: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true
    },
    teacher_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    f_ini: {
      type: DataTypes.DATE,
      allowNull: false
    },
    f_fin: {
      type: DataTypes.DATE,
      allowNull: false
    },
    capacity: {
      type: DataTypes.INTEGER(10),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  }, {
    indexes: [{ unique: true, fields: ['title'] }], 
    timestamps: true, // Activa la creación automática de createdAt y updatedAt
    updatedAt: 'updated_at',
    createdAt: 'created_at'
  });

    //Un usuario(teacher) puede tener muchos eventos pero un evento solo puede estar asociado a un usuario teacher_id
    User.hasMany(Event, { foreignKey: 'teacher_id'});
    //Un evento pertenece a un usuario como profesor
    Event.belongsTo(User, { foreignKey: 'teacher_id' }); 

    //Un usuario puede tener muchas inscripciones como estudiante
    User.hasMany(Inscription, { foreignKey: 'student_id' });
    //Una inscripción pertenece a un user-estudiante
    Inscription.belongsTo(User, { foreignKey: 'student_id' });

    //un evento puede tener muchas inscripciones
    Event.hasMany(Inscription, {foreignKey: 'event_id'});
    //una inscripción pertenece a un evento 
    Inscription.belongsTo(Event, { foreignKey: 'event_id' });

  export default Event;


