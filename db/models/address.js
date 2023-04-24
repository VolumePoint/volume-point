const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    address_id:{
        type:String,
        required:true,
        unique:true,
    },
    house_no:{
        type:String,
        required:true,
    },
    society_name:{
        type:String,
        required:true,
    },
    area_name:{
        type:String,
        required:true,
    },
    nearby_location:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    state:{
        type:String,
        required:true,
    },
});

const Address = new mongoose.model('address',addressSchema);

module.exports = Address;