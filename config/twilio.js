// Download the Node helper library from twilio.com/docs/node/install
// These consts are your accountSid and authToken from https://www.twilio.com/console
const accountSid = 'AC08917a0306887de223b707ba862c0242';
const authToken = '3d3a1f916a39577a90b150ca1c7556be';
const Props = require('../util/api-properties');
const client = require('twilio')(Props.twilio.accountSid, Props.twilio.authToken);
var authy = require('authy')('o1oqKp7ZQuXZhvYiDYvsC0yLCQFwwSSz');


/*module.exports.SMSSender = (toNumber,body) => {
let number ='+91'+toNumber;
console.log("To phone numer is "+ number);
console.log("The body to be sent is "+ body);
console.log("The from Props.twilio.sender "+ Props.twilio.sender);

client.messages.create({
  body: body,
  to: number,
  from: Props.twilio.sender,
})
.then((message) => process.stdout.write(message.sid));

}*/

module.exports.SMSSender = (toNumber,body) => {
console.log("To phone numer is "+ toNumber);

	authy.phones().verification_start(toNumber, '91', 'sms', function(err, res) {
		console.log("Completed SMS");
		if(err){
			console.log("Pikazza err"+ JSON.stringify(err));
		}
		else{
			console.log("Pikazza res"+ JSON.stringify(res));
		}

	});

}


module.exports.SMSVerifier = (toNumber,code,next) => {
let number ='+91'+toNumber;
console.log("To phone numer is "+ number);
console.log("To code numer is "+ code);

	authy.phones().verification_check(toNumber, '91', code , function (err, res) {

		console.log("Verified SMS");
		if(err){
			console.log("Pikazza err"+ JSON.stringify(err));
			next(err)
		}
		else{
			console.log("Pikazza res"+ JSON.stringify(res));
			next(null, res);
		}

	});

console.log("Verified SMS Completed");

}