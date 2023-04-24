const mongoose = require('mongoose');
const validator = require('validator');

const bookSchema = new mongoose.Schema({
    book_id:{
        type:String,
        required:true,
        unique:true,
    },
    title:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    author:{
        type:String,
        required:true,
    },
    language:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    no_of_pages:{
        type:Number,
        required:true,
    },
    quanity:{
        type:Number,
        required:true,
    },
    publisher:{
        type:String,
        required:true,
    },
    publication_date:{
        type:Date,
        required:true,
        default:Date.now
    },
    on_sale_date:{
        type:Date,
        required:true,
        default:Date.now
    },
    country_of_origin:{
        type:String,
        required:true,
    },
    book_condition:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    book_transaction_status:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    book_image:{
        type:String,
        required:true,
    },
    receiving_address:{
        type:String,
        required:true
    },
    available:{
        type:Boolean,
        required:true,
    },
});

const Book = new mongoose.model('Book',bookSchema);

module.exports = Book;