module.exports = {
	paytm_config: {
		HOST_TXNSTATUS:'https://pguat.paytm.com/oltp/HANDLER_INTERNAL/getTxnStatus',
		MID: 'AGGARW60155040679165',
		WEBSITE: 'APP_STAGING',
	    CHANNEL_ID: 'WAP',
	    INDUSTRY_TYPE_ID: 'Retail',
	    MERCHANT_KEY : 's8rFS8UjSvx!DZWr'
	},
	db:{
		url:'mongodb://localhost:21215/agarwal-db',
		name:'agarwal-db',
	},
	twilio:{
		accountSid:"AC08917a0306887de223b707ba862c0242",
		authToken:"3d3a1f916a39577a90b150ca1c7556be",
		sender:"+14438430521",
		body: "The verification code of Aggarwal Daily needs is "

	},
	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	jwtSecret:{
		key:'secretpasswordforstarvzinodejsproject'
	},
	logger:{
		path:'/app/logs/'
	},
	imageRefPath:{
		uploadPath:'/app/aggarwal-images/images/',
		hostingPath:'/app/aggarwal-images/',
		host:'http://35.200.176.109:8080/images/'
	},
	/*imageRefPath:{
		uploadPath:'/opt/starvzi-images/images/',
		hostingPath:'/opt/starvzi-images/',
		//host:'http://192.168.0.62:8080/images/'
		host:'http://35.198.227.184/images/'
		//host:'http://35.187.21.181/images/'
		//uploadPath:'/opt/starvzi-images/images/',
	},*/
	swagger:{
		hostpath:'35.200.176.109:8080'
	}
};
