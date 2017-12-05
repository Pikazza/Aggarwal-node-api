'use strict';

const gcm = require('node-gcm');

const sender = new gcm.Sender('YOUR_API_KEY_HERE');
const regTokens = ['YOUR_REG_TOKEN_HERE'];

let message = new gcm.Message({
    priority: 'high',
    contentAvailable: true,
    timeToLive: 3,
    data: {
        key1: 'message1',
        key2: 'message2'
    },
    notification: {
        title: "Hello, World",
        icon: "ic_launcher",
        body: "This is a notification that will be displayed if your app is in the background."
    }
});

sender.send(message, { registrationTokens: regTokens }, 10,function (err, response) {
  if(err) console.error(err);
  else    console.log(response);
});

//https://www.npmjs.com/package/node-gcm