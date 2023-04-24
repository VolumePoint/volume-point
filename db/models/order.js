const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_name:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
    },
    order_id:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    user_id:{
        type:String,
        required:true,
    },
    address_id:{
        type:String,
        required:true,
    },
    no_of_item:{
        type:Number,
        required:true,
    },
    total:{
        type:String,
        required:true,
    },
    delivered:{
        type:Boolean,
        required:true,
    },
    order_date:{
        type:Date,
        required:true,
        default:Date.now
    }
});

const orderItemSchema = new mongoose.Schema({
    order_item_id:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    book_id:{
        type:String,
        required:true,
    },
    order_id:{
        type:String,
        required:true,
    },
    quantity:{
        type:Number,
        required:true,        
    },
    item_total:{
        type:String,
        required:true,
    },
});

const Order = new mongoose.model('Order',orderSchema);

const OrderItem = new mongoose.model('OrderItem',orderItemSchema);

module.exports = {Order,OrderItem};
