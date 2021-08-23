'use strict';
require('dotenv').config();

// const event = require('../../events');
const faker = require('faker');
const io = require('socket.io-client');
let host = 'http://localhost:3001';
const capsConnection = io.connect(`${host}/caps`);

const storeName= process.env.STORE_NAME || 'flower shop';
const storeId = process.env.STORE_ID || 'jnjkfdnkjbnfk';


setTimeout(()=>{
    
    const orderInfor={
        storeName,
        storeId,
         orderId :faker.datatype.uuid(),
        customerName : faker.name.findName(),
         address: faker.address.streetAddress(),
    }

    capsConnection.emit('pickup',orderInfor );
},5000);


capsConnection.on('delivered', (payload) => {
   
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);

});
