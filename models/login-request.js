'use strict';

const ValidationError = require('../exceptions/validation-error');
const mongoose = require('mongoose'),
Schema = mongoose.Schema;

/*let validateEmail = function(authId) {
    //let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let regx=/^[a-zA-Z0-9.!#$%&’*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return regx.test(authId)
};*/


let loginRequestSchema = new Schema({
	authId:{
        type: String,
        trim: true,
        minlength: 10,
        maxlength: 12
        },
  	authToken:{
        type: String,
        required: true,
        },
	deviceType:{
        type: String,
        required: true,
        },
	deviceToken:{
        type: String,
        required: true,
        }
	});


let loginRequest = mongoose.model("loginRequest", loginRequestSchema);

/*let validateLoginRequest = function(reqLoginRequest,next){
  let  valideLoginRequest = new loginRequest(reqLoginRequest);
  valideLoginRequest.validate( function(err){
      if (err) {
        next(new ValidationError(err));
      }
      console.log("validation - error"+ err);
	});
};*/

let validateLoginRequest = function(reqFranchisee,next){
	let verified =false; 
	let  valideLoginRequest = new loginRequest(reqFranchisee);
	let validationErr = valideLoginRequest.validateSync();
		if (validationErr) {
			next(new ValidationError(validationErr));
		}
		else{
			return true;
		}
}


module.exports = {
    LoginRequest: loginRequest,
    ValidateLoginRequest: validateLoginRequest
};