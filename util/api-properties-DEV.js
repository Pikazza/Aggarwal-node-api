//DEV

module.exports = {
	mail:{
		host:'smtp.gmail.com',
		port:'465',
		senderName:'HaoChii',
		senderMailId:'pikazzatestsp@gmail.com',
		passWord:'Pikazza1'
	},
	db:{
		url:'mongodb://haochii_admin:haochii123@localhost:27017/haochii_db',
		name:'haochii_db'
	},
	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	jwtSecret:{
		key:'secretpasswordforhaochiinodejsproject'
	},
	logger:{
		path:'/home/ubuntu/haochii-log/'
	},
	imageRefPath:{
		uploadPath:'/home/ubuntu/haochii-images/images/',
		hostingPath:'/home/ubuntu/haochii-images/',
		host:'http://192.168.0.63:8080/images/'
	},
	swagger:{
		hostpath:'52.210.196.48:8080'
	}
};

//54.169.42.157 //localhost //52.210.196.48 //haochii_db_test // haochii_db
///home/ubuntu/haochii_images/images/
///home/prabakaran/Documents/haochii_images/images/