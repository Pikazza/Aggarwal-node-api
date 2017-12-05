"use strict";

function AccessDeniedError(error) {
  this.name = "AccessDeniedError";
  this.message = error;
  this.inner = error;
}
module.exports = AccessDeniedError;