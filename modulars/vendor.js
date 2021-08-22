'use strict';
const event = require('../events');
const faker = require('faker');

const storeName= process.env.STORE_NAME || 'flower shop';





    setTimeout(()=>{
    
        const orderInfor={
            storeName,
             orderId :faker.datatype.uuid(),
            customerName : faker.name.findName(),
             address: faker.address.streetAddress(),
            // customerName : 'mayadah',
            // orderId: 123456789,

        }
    
        event.emit('pickup',orderInfor );
    },5000)
        
   


event.on('delivered', (payload) => {
   
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);

});
