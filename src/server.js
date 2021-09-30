const express = require('express');
const routes = require('./routes');
const cors = require('cors');

const server = express();

//SETTINGS
server.set('PORT', 4500);


//MIDDLEWARES
server.use(express.json());
server.use(cors());

//ROUTES
server.use('/api/user', routes.user);
server.use('/api/message', routes.message);

//PUBLIC FOLDER

module.exports= server;