const { io } = require('../index');
const Bands = require('../models/bands');
const Band = require('../models/band');
const bands = new Bands();

bands.addBand(new Band('Kyary Pamyu Pamyu'));
bands.addBand(new Band('Perfume'));
bands.addBand(new Band('Armin van Buuren'));
bands.addBand(new Band('Paul van Dyk'));

console.log(bands);
// Mensajes de Sockets
io.on('connection', client => {
    console.log('Cliente Conectado');
    client.emit('active-bands', bands.getBands());
    // console.log(bands.getBands());

    // client.on('event', data => { /* … */ });
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
    client.on('mensajeID', (mensaje) => {
        console.log('Mensaje!!!', mensaje.nombre);
        io.emit('mensaje', { admin: 'Nuevo Mensaje' })
    });
    client.on('emitir-mensajee', (payload) => {
        // io.emit('mensaje-appflutter', payload); //Emite a todos los clientes
        client.broadcast.emit('mensaje-appflutter', payload); //Emite a toddos menos al que lo emtiio
    })

    client.on('Voto-banda', (payload) => {
        console.log('Voto!!!', payload.nombre + ' ID:  ' + payload.id);
        bands.voteBand(payload.id);
        client.emit('active-bands', bands.getBands());
    })
    client.on('NuevaBanda', (payload) => {
        console.log('Nueva Bandaa', payload.nombre);
        bands.addBand(new Band(payload.nombre))
        client.emit('active-bands', bands.getBands());
    })
    client.on('DeleteBand', (payload) => {
        console.log('Delete Band', payload.id);
        bands.deleteBand(payload.id);
        client.emit('active-bands', bands.getBands());

    })
});