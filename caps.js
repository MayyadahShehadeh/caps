'use strict';

require('dotenv').config();
const port = process.env.PORT || 3001;

const io = require('socket.io')(port);

const CAPS = io.of('/caps');

// const event = require('./events');
// require('./modulars/driver/driver');
// require('./modulars/vendor/vendor');


io.on('connection', (socket)=>{
    console.log('CONNECTED', socket.id);

})

CAPS.on('connection', (socket)=>{
    console.log('CONNECTED', socket.id);

    socket.on('pickup', (payload)=>{
    console.log(`EVENT, {event: 'pickup'`);
    console.log(`time: ${new Date()}`);
    console.log('payload:',payload);
    CAPS.emit('pickup',payload);
    });

    socket.on('in-transit',(payload)=>{
        console.log(`EVENT, {event: 'in-transit`);
        console.log(`time: ${new Date()}`);
        console.log('payload:',payload);
        CAPS.emit('transit',payload);

    });

    socket.on('delivered',(payload)=>{
        console.log(`EVENT, {event: 'delivered`);
        console.log(`time: ${new Date()}`);
        console.log('payload:',payload);
        CAPS.emit('delivered',payload);

    });
});

