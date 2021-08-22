'use strict';

const event = require('./events');
require('./modulars/driver');
require('./modulars/vendor');



event.on('pickup', (payload)=>{

console.log(`EVENT, {event: 'pickup'`);
console.log(`time: ${new Date()}`);
console.log('payload:',payload);


})

event.on('in-transit',(payload)=>{
    console.log(`EVENT, {event: 'in-transit`);
    console.log(`time: ${new Date()}`);
    console.log('payload:',payload);
    

})

event.on('delivered',(payload)=>{
    console.log(`EVENT, {event: 'delivered`);
    console.log(`time: ${new Date()}`);
    console.log('payload:',payload);
    

})