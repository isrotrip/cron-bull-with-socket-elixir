'use strict';

const bcrypt = require('../helpers/bcrypt.js');


module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;
  
  class User extends Model {}
  
  User.init({
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username tidak boleh kosong.'
        },
        len: {
          args: [4, 10],
          msg: 'Panjang username harus diantara 4 - 10.'
        },
        customeUnique(username) {
          return User
            .findOne({
              where: {
                username
              }
            })
            .then(user => {
              if (user && this.id !== user.id) {
                throw 'Username telah terpakai.'
              }
            });
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong.'
        }
      }
    },
    premium: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password tidak boleh kosong.'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = bcrypt.hash(user.password);
      }
    },
    sequelize
  });

  User.associate = function(models) {
    User.hasMany(models.Chat);
  };

  return User;
};