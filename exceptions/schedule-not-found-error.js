"use strict";

function ScheduleNotFoundError(error) {
 this.name = "ScheduleNotFoundError";
 this.message = error;
}
module.exports = ScheduleNotFoundError;