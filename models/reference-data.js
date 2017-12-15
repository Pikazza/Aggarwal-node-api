const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let homeTopSliderSchema = new Schema({
    image:String,
    status:String,
    tags:[String]
})

let sliderSchema = new Schema({
    image:String,
    status:String
})

let referenceDataSchema = new Schema({
	dayDeals:[String],
    homeTopSlider:[homeTopSliderSchema],
    homebottomSlider:[sliderSchema],
    medicosSlider:[sliderSchema],
    opticalsSlider:[sliderSchema]
    },{ collection: 'referenceData' });


let referenceData = mongoose.model("referenceData", referenceDataSchema);

module.exports = {
    ReferenceData: referenceData
};
