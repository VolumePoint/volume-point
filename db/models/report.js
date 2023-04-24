const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
    report_id:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    month:{
        type:Number,
        required:true,
    },
    monthname:{
        type:String,
        required:true,
    },
    year:{
        type:Number,
        required:true,
    },
    sell_received:{
        type:Number,
        required:true,
    },
    sell_not_received:{
        type:Number,
        required:true,
    },
    donate_received:{
        type:Number,
        required:true,
    },
    donate_not_received:{
        type:Number,
        required:true,
    },
    buy_delivered:{
        type:Number,
        required:true,
    },
    buy_not_delivered:{
        type:Number,
        required:true,
    },
});

const Report = new mongoose.model('Report',reportSchema);

module.exports = Report;