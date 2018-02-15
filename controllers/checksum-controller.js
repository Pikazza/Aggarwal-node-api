
var paytm_checksum = require('../paytm/checksum');
var querystring = require('querystring');
const logger = require('../config/logger');
var request = require('request');
const Props = require('../util/api-properties');

exports.get = (req, res, next) => {
	logger.info("Getting checksum ....");

	if (req.query.orderId){
		logger.info(" Checking transaction status ...."+req.query.orderId);
			var paramarray = {};
			paramarray['MID'] = Props.paytm_config.MID;
			paramarray['ORDERID'] = req.query.orderId;
				paytm_checksum.genchecksum(paramarray, Props.paytm_config.MERCHANT_KEY, function (err, res1) {
					
					var options = { method: 'GET',
									  url: Props.paytm_config.HOST_TXNSTATUS,
									  qs: { JsonData: JSON.stringify(res1) } };
					console.log("Pikazza status txn url is options  "+JSON.stringify(options))
									request(options, function (error, response, body) {
									  if (error) throw new Error(error);

									  console.log(body);
									  res.status(200).json(JSON.parse(body));
									});
				});
}else{
		res.status(200).json({"status":true});
	}

};

exports.generate = (req, res, next) => {
	logger.info("generate checksum ...."+req.body.orderId);
			var paramarray = {};
				paramarray['MID'] = req.body.mid; //Provided by Paytm
				paramarray['ORDER_ID'] = req.body.orderId; //unique OrderId for every request
				paramarray['CUST_ID'] = req.body.customerId;  // unique customer identifier 
				paramarray['INDUSTRY_TYPE_ID'] = req.body.industryType; //Provided by Paytm
				paramarray['CHANNEL_ID'] = req.body.chennalType; //Provided by Paytm
				paramarray['TXN_AMOUNT'] = req.body.amount; // transaction amount
				paramarray['WEBSITE'] = req.body.website; //Provided by Paytm
				paramarray['CALLBACK_URL'] = req.body.calbackurl;//Provided by Paytm
				paramarray['EMAIL'] = req.body.email; // customer email id
				paramarray['MOBILE_NO'] = req.body.mobileNo; // customer 10 digit mobile no.
					paytm_checksum.genchecksum(paramarray, Props.paytm_config.MERCHANT_KEY, function (err, res1) {
						 res.status(200).json(res1);
					});
};

exports.verify = (req, res, next) => {
	logger.info("verify checksum ....");	
		if(paytm_checksum.verifychecksum(req.body, Props.paytm_config.MERCHANT_KEY)) {
				console.log("true");
				res.status(200).json({"status":true});
			}else{
				console.log("false");
				res.status(200).json({"status":false});
			}
		};


function htmlEscape(str) {
  return String(str)
          .replace(/&/g, '&amp;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#39;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
}


