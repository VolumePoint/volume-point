const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_id:{
        type:String,
        required:true,
        unique:true,
    },
    cat_name:{
        type:String,
        required:true,
        unique:true,
    },
    cat_image:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    no_of_books:{
        type:Number,
        default:0
    }
});

const Category = new mongoose.model('Category',categorySchema);

module.exports = Category;