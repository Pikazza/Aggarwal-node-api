
"use strict";

function OTPValidationError(error) {
 this.name = "OTPValidationError";
 this.message = error;
}
module.exports = OTPValidationError;