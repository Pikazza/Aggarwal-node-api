
"use strict";

function ValidationError(error) {
 this.name = "ValidationError";
 this.message = error;
}
module.exports = ValidationError;