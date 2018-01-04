const mongoose = require('mongoose'),
Schema = mongoose.Schema;

let homeTopSliderSchema = new Schema({
    name:String,
    order:Number,
    image:String,
    status:String,
    tags:[String]
})

let sliderSchema = new Schema({
    name:String,
    order:Number,
    image:String,
    status:String
})

let regionSchema = new Schema({
    name:String,
    sellerId:String
})

let referenceDataSchema = new Schema({
	dailyNeeds:[String],
    dealOfTheDay:[String],
    homeTopSlider:[homeTopSliderSchema],
    homebottomSlider:[sliderSchema],
    medicosSlider:[sliderSchema],
    opticalsSlider:[sliderSchema],
    regionList:[regionSchema]
    },{ collection: 'referenceData' });


let referenceData = mongoose.model("referenceData", referenceDataSchema);

module.exports = {
    ReferenceData: referenceData
};
