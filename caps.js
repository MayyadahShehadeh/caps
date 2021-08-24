'use strict';

require('dotenv').config();
const faker = require('faker');
const port = process.env.PORT || 3001;

const io = require('socket.io')(port);

const CAPS = io.of('/caps');

// const event = require('./events');
// require('./modulars/driver/driver');
// require('./modulars/vendor/vendor');

const msgQueue = {
    chores : {}
}

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
        socket.emit('in-transit',payload);

    });

    socket.on('delivered',(payload)=>{
        console.log(`EVENT, {event: 'delivered`);
        console.log(`time: ${new Date()}`);
        console.log('payload:',payload);
        CAPS.emit('delivered',payload);

    });
    socket.on('new_message', payload=> {
        console.log("adding a new task ....")
        const id = faker.datatype.uuid();
        console.log("id ====> ", id)
        msgQueue.chores[id] = payload;
        socket.emit('added', payload); // telling the parent a task was added
        CAPS.emit('chore', {id: id, payload: msgQueue.chores[id]});
        console.log("after add msgQueue ========> ", msgQueue)
    });

    socket.on('get_all', ()=> {
        Object.keys(msgQueue.chores).forEach(id=> {
            socket.emit('chore', {id: id, payload: msgQueue.chores[id] })
        });
    });

    socket.on('received', msg => {
        console.log("received on queue will remove it ...")
        // he child confirmed receiving , remove from queue
        delete msgQueue.chores[msg.id];
        console.log("after delete msgQueue @@@@@@@@@@ ", msgQueue)
    })

});

