'use strict';
const ValidationError = require('../exceptions/validation-error');

const mongoose = require('mongoose'),
Schema = mongoose.Schema;
const statusType = ['ACTIVE','INACTIVE'];
const channelType = ['ANDROID','IOS'];

let notificationSchema = new Schema({
      notId:{
      type: String,
      unique: true
    },
      notName:String,
      notDesc:String,
      status:{type: String, enum: statusType},
      sendAt:Date,
      createdOn: {
          type: Date
          },
      modifiedOn: {
        type: Date, 
        default: Date.now
        },
      channelType:{type: String, enum: channelType},
    },{ collection: 'notification' });

let notification = mongoose.model("notification", notificationSchema);


module.exports = {
    Notification: notification
};