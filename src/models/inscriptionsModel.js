import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';
import User from './userModel.js';
//En esta tabla comprobaremos los student_id para saber que estudiante ha estado en cada evento, si ha pagadp o no etc.
const Inscription = sequelize.define('Inscription', {
    event_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    student_id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true
    },
    is_paid: {
      type: DataTypes.TINYINT(1), //cambiado a Tinyint(1) en vez de Boolean para que coincida con db
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
    
      timestamps: true, // Activa la creación automática de createdAt y updatedAt
      updatedAt: 'updated_at',
      createdAt: 'created_at'
    });

    export default Inscription;