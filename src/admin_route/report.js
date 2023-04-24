const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Book = require('../../db/models/book');
const Order = require('../../db/models/order');
const Report = require('../../db/models/report');
const Pagination = require('../../utilities/pagination');

router.get('/admin/report',auth.adminAuth,async (req,res)=>{

    try {

        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();

        const monthname = date.toLocaleString('default', { month: 'long' });

        if(month<=8){ // 0+1=1 1+1=2 2+1=3 3+1=4 4+1=5 5+1=6 6+1=7 7+1=8 8+1=9 9+1=10 10+1=11 11+1=12
           var  startDate = new Date(year+"-0"+(month+1)+"-01");
           var endDate = new Date(year+"-0"+(month+1)+"-31");
        }
        else{
            var startDate = new Date(year+"-"+(month+1)+"-01");
             var endDate = new Date(year+"-"+(month+1)+"-31");
        }

        var books = await Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'sell',available:true});
        var keys = Object.keys(books);
        var sell_received = keys.length;

        books = await Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'sell',available:false});
        keys = Object.keys(books);
        var sell_not_received = keys.length;

        books = await Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'donate',available:true});
        keys = Object.keys(books);
        var donate_received = keys.length;

        books = await Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'donate',available:false});
        keys = Object.keys(books);
        var donate_not_received = keys.length;

        var order = await Order.Order.find({order_date:{$gte: startDate,$lte: endDate},delivered:true});
        keys = Object.keys(order);
        var buy_delivered = keys.length;

        var order = await Order.Order.find({order_date:{$gte: startDate,$lte: endDate},delivered:false});
        keys = Object.keys(order);
        var buy_not_delivered = keys.length;

        const report_id = "report"+month+year;

        console.log(report_id);

        const report = await Report.findOne({report_id:report_id});

        if(report == null){
            const r1 = new Report({
                report_id:report_id,
                month:month,
                monthname:monthname,
                year:year,
                sell_received:sell_received,
                sell_not_received:sell_not_received,
                donate_received:donate_received,
                donate_not_received:donate_not_received,
                buy_delivered:buy_delivered,
                buy_not_delivered:buy_not_delivered,
            });

            const res1 = await r1.save();
        }
        else{

             Report.findOneAndUpdate({report_id:report_id},{month:month,monthname:monthname,year:year,sell_received:sell_received,sell_not_received:sell_not_received, donate_received:donate_received,donate_not_received:donate_not_received,buy_delivered:buy_delivered,buy_not_delivered:buy_not_delivered,},{new:true},async (err,updateProfile)=>{
                if(err)
                    res.send(err);
             });
        }

        Report.find((err,data)=>{
            if(err)
                req.send(err);
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('Admin/db_menu/report',{data:records});
            }
        });

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

router.get('/admin/report/transaction',auth.adminAuth,async (req,res)=>{

    try {

        console.log(req.query.bool);
        console.log(req.query.transaction);

        const bool = req.query.bool;
        const transaction = req.query.transaction;
        var month = req.query.month;
        const year = req.query.year;
        
        month++;

        if(month<=8){ // 0+1=1 1+1=2 2+1=3 3+1=4 4+1=5 5+1=6 6+1=7 7+1=8 8+1=9 9+1=10 10+1=11 11+1=12
            var startDate = new Date(year+"-0"+month+"-01");
            var endDate = new Date(year+"-0"+month+"-31");
        }
        else{
            var startDate = new Date(year+"-"+(month+1)+"-01");
            var endDate = new Date(year+"-"+(month+1)+"-31");
        }

        console.log(startDate);
        console.log(endDate);

        if(transaction === "sell" && bool == "true"){

            console.log('working');

            Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'sell',available:true},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    res.render('Admin/db_menu/report_sell',{data:data}); 
                }
            });
        }

         if(transaction === "sell" && bool == "false"){

            console.log('working');

            Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'sell',available:false},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    res.render('Admin/db_menu/report_sell',{data:data}); 
                }
            });
        }

        if(transaction == "donate" && bool == "true"){

            Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'donate',available:true},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    res.render('Admin/db_menu/report_donate',{data:data}); 
                }
            });
        }

        if(transaction == "donate" && bool == "false"){

            Book.find({on_sale_date:{$gte: startDate,$lte: endDate},book_transaction_status:'donate',available:false},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    res.render('Admin/db_menu/report_donate',{data:data}); 
                }
            });
        }

        if(transaction == "buy" && bool == "true"){

            Order.Order.find({order_date:{$gte: startDate,$lte: endDate},delivered:true},(err,data)=>{
                if(err)
                    res.status(400).send(err);
                else{
                    res.render('Admin/db_menu/report_buy',{data:data});
                }
            });
        }

         if(transaction == "buy" && bool == "false"){

            Order.Order.find({order_date:{$gte: startDate,$lte: endDate},delivered:false},(err,data)=>{
                if(err)
                    res.status(400).send(err);
                else{
                    res.render('Admin/db_menu/report_buy',{data:data});
                }
            });
        }

        
    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

router.get('');

module.exports = router;

