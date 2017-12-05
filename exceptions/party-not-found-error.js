"use strict";

function PartyNotFoundError(error) {
  this.name = "PartyNotFoundError";
  this.message = error;
}
module.exports = PartyNotFoundError;