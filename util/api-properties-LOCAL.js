//LOCAL

module.exports = {
	mail:{
		host:'smtp.gmail.com',
		port:'465',
		senderName:'HaoChii',
		senderMailId:'pikazzatestsp@gmail.com',
		passWord:'Pikazza1'
	},
	db:{
		url:'mongodb://haochii_admin:haochii123@52.210.196.48:27017/haochii_db_test',
		name:'haochii_db_test',
	},
	basicAuth:{
		userName:'Cumulonimbus',
		passWord:'H40@C#i!CuMl0P!K4ZzA9nIWBuzH40@C#i!'
	},
	jwtSecret:{
		key:'secretpasswordforhaochiinodejsproject'
	},
	logger:{
		path:'/home/prabakaran/haochii-log/',
	},
	imageRefPath:{
		uploadPath:'/home/prabakaran/haochii-images/images/',
		hostingPath:'/home/prabakaran/haochii-images/',
		host:'http://192.168.0.63:8080/images/'
	},
	swagger:{
		hostpath:'localhost:8080'
	}
};

//54.169.42.157 //localhost //52.210.196.48 //haochii_db_test // haochii_db
///home/ubuntu/haochii_images/images/
///home/prabakaran/Documents/haochii_images/images/