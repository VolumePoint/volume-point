const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
    cart_item_id:{
        type:String,
        required:true,
        unique:true,
    },
    book_id:{
        type:String,
        required:true,
    },
    user_id:{
        type:String,
        required:true,
    }
});

const Cart = new mongoose.model('Cart',cartItemSchema);

module.exports = Cart;