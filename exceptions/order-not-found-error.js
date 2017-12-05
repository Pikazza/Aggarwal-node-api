"use strict";

function OrderNotFoundError(error) {
 this.name = "OrderNotFoundError";
 this.message = error;
}
module.exports = OrderNotFoundError;