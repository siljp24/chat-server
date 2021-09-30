const server = require('./server');
require('./database')

server.listen(server.get('PORT'), ()=>{
    console.log('Servidor corriendo en el puerto:', server.get('PORT'))
})