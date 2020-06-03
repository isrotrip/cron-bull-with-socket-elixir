'use strict';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const express = require('express');
const cors = require('cors');

const router = require('./routers');
const errorHandler = require('./middlewares/errorHandler.js');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use((req, res, next) => {
  req.io = io;
  next();
});

app.use(router);
app.use(errorHandler);

module.exports = server;
