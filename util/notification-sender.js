'use strict';

let cron = require('node-cron');
const _ = require('lodash');
const customerRepository = require('../repository/customer-repository'); 
const pushNotify = require('../config/push-notifications');
const notificationRepository = require('../repository/notification-repository'); 
const apiProperties = require('./api-properties');

let task =cron.schedule('*/10 * * * *', function(){
  console.log('running a task every two minutes');
let tokenArray=[];

notificationRepository.findValidNotification(function(err, result) {
		  if (err) {
		  	//next(err);
		  }
		  else{
		  	console.log("Pikaza notification record "+result.length);

				_.forEach(result, function(notify){

					customerRepository.findAll(function(err, result1){
						if (err) {
							//next(err);
						}
						else{
							if (result1){
								_.forEach(result1, function(customer){
									if(customer.device && customer.device.deviceToken){
										tokenArray.push(customer.device.deviceToken);		
									}									
								});
							}

						}
						console.log("Pikazza notification array "+tokenArray)
						pushNotify.pushit(apiProperties.notification.customersKey,result.notDesc,[tokenArray]);
						notify.status='DEACTIVE';
						notificationRepository.update(notify, function(err, result2) {
							if (err) {
							console.log("error while updating notification on cron ")
							}  
							else{
								console.log("notification updation is done on cron")
							}
						});

					});
														
				});

		  }

	});

});

task.start();