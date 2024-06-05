const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({

    Item_no: {

        type : String,
        
        required: true,
    },


    First_and_Last_Name: {
 
        type: String,
        required: true,


    },

    Mobile_Number : {

        type: String,
        required: true,
       

    },

    Complete_Address: {
        type: String,
        required: true,
    },

     Area_PIN_code : {
        type: String,
        required: true,
     },

     House_Number: {
        type: String,
        required: true,
     }
}, {
    timestamps: true
})


const customer = mongoose.model('customer', urlSchema)

module.exports= customer