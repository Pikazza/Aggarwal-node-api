"use strict";

function MenuNotFoundError(error) {
 this.name = "MenuNotFoundError";
 this.message = error;
}
module.exports = MenuNotFoundError;