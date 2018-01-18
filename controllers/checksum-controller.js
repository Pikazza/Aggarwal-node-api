
var paytm_config = require('../paytm/paytm_config').paytm_config;
var paytm_checksum = require('../paytm/checksum');
var querystring = require('querystring');
const logger = require('../config/logger');

exports.get = (req, res, next) => {
	logger.info("Getting checksum ....");	
    res.status(200).json({"status":true});
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
					paytm_checksum.genchecksum(paramarray, paytm_config.MERCHANT_KEY, function (err, res1) {
						 res.status(200).json(res1);
					});
};

exports.verify = (req, res, next) => {
	logger.info("verify checksum ....");	
		if(paytm_checksum.verifychecksum(req.body, paytm_config.MERCHANT_KEY)) {
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