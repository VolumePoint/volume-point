const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');
const Order = require('../../db/models/order');
const Book = require('../../db/models/book');
const Address = require('../../db/models/address');
const auth = require('../../middleware/auth');
const { response } = require('express');
const { user, book } = require('../../global');
const Pagination = require('../../utilities/pagination');

router.get('/user_order',auth.userAuth,async (req,res)=>{

    try {

        Order.Order.find({user_id:req.user.user_id},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('User/pages/db_menu/user_order',{data:records});
            }
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user_order_details/:order_id',auth.userAuth,async (req,res)=>{

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
        
        res.render('User/pages/db_menu/user_order_details',{order:order,address:address,book:books});
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;