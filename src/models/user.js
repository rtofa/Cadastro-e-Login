'use strict';

import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

  class User extends Model {
    static associate(models) {

    }
  }

User.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
        resetCode: {
          type: DataTypes.STRING,
            allowNull: true,
        },
        resetCodeExpires: {
          type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
      sequelize,
      modelName: 'User',
    }
);

  export default User;
