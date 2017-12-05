const mongoose = require('mongoose'),
Schema = mongoose.Schema;


const menuType = ['MENUTYPE_1','MENUTYPE_2','MENUTYPE_3'];
const categoryType = ['BASE','TOPPING','SAUCE','SIDE','DRINK','COMBO'];

let referenceMenuSchema = new Schema({
	franchisorName:String,
    menuType:{type: String, enum: categoryType},
    menuValidityStart: {
        type: Date
        },
    menuValidityEnd: {
	    type: Date
	    },
    menuItem:[
	    {
			itemName:String,
			itemDesc:String,
			price:String,
			category:{type: String, enum: menuType},
			comboDeal:[String]
		}
	]
    },{ collection: 'referenceMenu' });


let referenceMenu = mongoose.model("referenceMenu", referenceMenuSchema);

module.exports = {
    ReferenceMenu: referenceMenu
};