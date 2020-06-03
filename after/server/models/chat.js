'use strict';

module.exports = (sequelize, DataTypes) => {
  const { Model } = sequelize.Sequelize;

  class Chat extends Model {}

  Chat.init({
    message: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Message tidak boleh kosong.'
        }
      }
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Type tidak boleh kosong.'
        }
      }
    },
    time: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          args: true,
          msg: 'Time harus berformat date.'
        },
        notEmpty: {
          args: true,
          msg: 'Time tidak boleh kosong.'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize
  });

  Chat.associate = function(models) {
    Chat.belongsTo(models.User);
  };

  return Chat;
};