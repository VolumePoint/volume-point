
const mongoose = require('mongoose');
const validator = require('validator');

const contactUsSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    phone:{
        type:Number,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
});

const ContactUS = new mongoose.model('contactus',contactUsSchema);

module.exports = ContactUS;