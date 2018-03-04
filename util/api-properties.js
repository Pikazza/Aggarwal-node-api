module.exports = {
	paytm_config: {
		HOST_TXNSTATUS:'https://pguat.paytm.com/oltp/HANDLER_INTERNAL/getTxnStatus',
		MID: 'AGGARW60155040679165',
		WEBSITE: 'APP_STAGING',
	    CHANNEL_ID: 'WAP',
	    INDUSTRY_TYPE_ID: 'Retail',
	    MERCHANT_KEY : 's8rFS8UjSvx!DZWr'
	},
	notification:{
		sellersKey:'AAAA3eYd9oo:APA91bGeXljzhB9Gl_newKddivGcTfDj6IxYCIlq1bTSaW4A6YbVmq4gt5lNwLK88bbyVkmHeE0O4NeiuuQMjvjTRGhsiKWvM9Jz0ae2fz4qWKY9--x61sMAQD6xx3UK-V_RYZhD9Xc-',
		customersKey:'AAAAtXKqCeg:APA91bH8e2cfENcvQGz5KqvCFT0JTj7fDTQmEWiDHd4YhXNDxcgnuOx_RwwcXnu_VxNTsUgDLfDe4vb-9LMXmcOqv_C7jmM3ChAhPPQwUo-qiHzDxL0H5yjpXkraAZtt17rHcHH6Y2Tp',
	},
	db:{
		url:'mongodb://pikazza:AggarWal123@localhost:21215/agarwal-db',
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
	logger:{
		path:'/app/logs/'
	},
	imageRefPath:{
		uploadPath:'/app/aggarwal-images/images/',
		hostingPath:'/app/aggarwal-images/',
		host:'http://35.200.191.243:8080/images/'
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
		hostpath:'35.200.191.243:8080'
	}
};
