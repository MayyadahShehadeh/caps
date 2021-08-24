'use strict';
require('dotenv').config();

// const event = require('../../events');
const faker = require('faker');
const io = require('socket.io-client');
let host = 'http://localhost:3001';
const capsConnection = io.connect(`${host}/caps`);

const storeName= process.env.STORE_NAME || 'flower shop';



setInterval(()=>{
    const orderInfor={
        storeName,
        storeId: faker.datatype.uuid(),
        orderId :faker.datatype.uuid(),
        customerName : faker.name.findName(),
        address: faker.address.streetAddress(),
    }
    // const payload = {
    //     orderInfor,
    //     pickup: `picking up ${orderInfor.orderId}`,
    //     deliver: `DRIVER: delivered up ${orderInfor.orderId}`,

//   }
        capsConnection.emit('pickup',orderInfor );
        capsConnection.emit('new_message',orderInfor);
    },5000);
    

capsConnection.on('delivered', (payload) => {
   
    console.log(`VENDOR: Thank you for delivering ${payload.orderId}`);

});

capsConnection.on('added', payload=> {
    console.log("Thank you for sending : ", payload , " to the queue");
    // capsConnection.disconnect();
});