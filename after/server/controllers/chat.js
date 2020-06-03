'use strict';

const { Chat } = require('../models');
const cronSpam = require('../helpers/cronSpam.js');
const cronTime = require('../helpers/cronTime.js');

class ChatController {
  static create(req, res, next) {
    const {
      message  = '',
      type = '',
      time  = ''
    } = req.body;

    Chat
      .create({
        message,
        type,
        time,
        UserId: req.userLogin.id
      })
      .then(chat => {
        function chatSocket(time) {
          if (chat.type !== 'once') {
            req.io.emit('chat', {
              message: chat.message,
              time: time,
              from: req.userLogin.username
            });
          } else {
            req.io.emit('chat', {
              message: chat.message,
              time: chat.time,
              from: req.userLogin.username
            });
          }
        }

        if (chat.type === 'spam') {
          cronSpam(chatSocket);
        } else if (chat.type === 'sendLater') {
          cronTime(chat.time, chatSocket);
        } else {
          chatSocket();
        }

        res.status(201).json({
          message: 'Berhasil kirim chat.',
          data: {
            message: chat.message,
            time: chat.time,
            from: req.userLogin.username
          }
        })
      })
      .catch(next);
  }
}

module.exports = ChatController;
