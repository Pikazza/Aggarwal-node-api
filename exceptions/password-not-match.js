"use strict";

function PartyNotFoundError(error) {
  this.name = "PasswordNotFound";
  this.message = error;
}
module.exports = PartyNotFoundError;