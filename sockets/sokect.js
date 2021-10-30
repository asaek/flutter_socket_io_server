const { io } = require('../index');

// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensaje', (mensaje) => {
        console.log('Mensaje!!!', mensaje.nombre);

        io.emit('mensaje', { admin: 'Nuevo Mensaje' })
    });



});