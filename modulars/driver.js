'use strict';
const event = require('../events');
require('./vendor');




event.on('pickup',(payload)=>{

setTimeout(()=>{
    console.log(`DRIVER: picked up ${payload.orderId}`);
    event.emit('in-transit',(payload));

},1000);


event.on('in-transit',(payload)=>{
setTimeout(()=>{

console.log(`DRIVER: delivered up ${payload.orderId}`);
event.emit('delivered',payload);

},3000);


})
})