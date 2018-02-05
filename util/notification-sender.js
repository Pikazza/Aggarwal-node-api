let cron = require('node-cron');
const _ = require('lodash');
const customerRepository = require('../repository/customer-repository'); 
const pushNotify = require('../config/push-notifications');
const notificationRepository = require('../repository/notification-repository'); 


let task =cron.schedule('*/15 * * * * *', function(){
  console.log('running a task every two minutes');
let tokenArray=[];

/*notificationRepository.findValidNotification(function(err, result) {
		  if (err) {next(err);}
		  else{
		  	console.log("Pikaza notification record "+result.length);
		  }

	});*/

customerRepository.findAll(function(err, result){
			if (err) {
				next(err);
			}
			else{
				if (result){
					_.forEach(result, function(customer){
						if(customer.device && customer.device.deviceToken){
							tokenArray.push(customer.device.deviceToken);		
						}									
					});
				}

			}
			console.log("Pikazza notification array "+tokenArray)
			pushNotify.pushit('Sample Customer Push notifications ',[tokenArray]);
			

		});



});

task.start();