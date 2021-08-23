'use strict';
// const event = require('../../events');
// require('../vendor/vendor');

const io = require('socket.io-client');

let host = 'http://localhost:3001';

const capsConnection = io.connect(`${host}/caps`);



capsConnection.on('pickup',(payload)=>{
setTimeout(()=>{
    console.log(`picking up ${payload.orderId}`);
    capsConnection.emit('in-transit',(payload));
},1500);





})
capsConnection.on('in-transit',(payload)=>{
setTimeout(()=>{
console.log(`DRIVER: delivered up ${payload.orderId}`);
capsConnection.emit('delivered',payload);

},3000);


})