import { DataTypes } from 'sequelize';
import { sequelize } from '../db.js';

const User = sequelize.define('User', {
  id_user: {
    type: DataTypes.INTEGER(8).UNSIGNED,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
  surname: {
    type: DataTypes.STRING(30),
    allowNull: true,
  },
  age: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false //lo cambié a true en vez de false
  },
  role: {
    type: DataTypes.ENUM('student', 'teacher'),
    allowNull: false, //lo cambie a true en vez de false
  },
  created_at:{
    type: DataTypes.DATE,
    allowNull: false
  },
  updated_at:{
    type: DataTypes.DATE,
    allowNull: false
  }
},{
  indexes: [{ unique: true, fields: ['email'] }],
  timestamps: true, // Activa la creación automática de createdAt y updatedAt
  updatedAt: 'updated_at',
  createdAt: 'created_at',

});


export default User;