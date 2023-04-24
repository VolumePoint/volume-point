const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Pagination = require('../../utilities/pagination');
const Order = require('../../db/models/order');
const Book = require('../../db/models/book');
const User = require('../../db/models/user');
const Address = require('../../db/models/address');
const Category = require('../../db/models/category');

router.get('/admin/buy_order',auth.adminAuth,async (req,res)=>{

    try {
        
        Order.Order.find((err,data)=>{
            if(err)
                res.status(400).send(err);
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('Admin/db_menu/buy_order',{data:records});
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
    
});

router.get('/admin/buy_order_details/:order_id',auth.adminAuth,async (req,res)=>{

    try {

        const order = await Order.Order.findOne({order_id:req.params.order_id});
        const order_item = await Order.OrderItem.find({order_id:order.order_id});

        var books = {};
        var c = 0;

        order_item.forEach(item => {
            Book.findOne({book_id:item.book_id},(err,book)=>{
                if(err)
                    res.send(err);
                else{
                    books[c++] = book;
                }
            });
        });

        const address = await Address.findOne({address_id:order.address_id});
        
        res.render('Admin/db_menu/buy_order_details',{order:order,address:address,book:books});
        
    } catch (error) {
        res.status(400).send(error);
    }

});

router.post('/admin/buy_order_details/:order_id',auth.adminAuth, async (req,res)=>{

    try {

        Order.Order.findOneAndUpdate({order_id:req.params.order_id},{delivered:req.body.delivered},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else    
                    // console.log(updateProfile);
                    res.redirect('/admin/buy_order');
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;