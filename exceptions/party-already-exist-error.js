
"use strict";

function PartyAlreadyExistError(error) {
 this.name = "PartyAlreadyExistError";
 this.message = error;
}
module.exports = PartyAlreadyExistError;