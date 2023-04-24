const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Book = require('../../db/models/book');
const User = require('../../db/models/user');
const Address = require('../../db/models/address');
const Category = require('../../db/models/category');
const Pagination = require('../../utilities/pagination');

router.get('/admin/sell_order',auth.adminAuth,async (req,res)=>{

    try {
        Book.find({book_transaction_status:"sell",receiving_address:{$ne:'volumepoint'}},(err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('Admin/db_menu/sell_order',{data:records});
            }
        });
        
    } catch (error) {
        res.status(400).send(error);
    } 
});

router.get('/admin/sell_order_details/:book_id',auth.adminAuth,async (req,res)=>{
    try {

        const book = await Book.findOne({book_id:req.params.book_id});
        const address = await Address.findOne({address_id:book.receiving_address});

        const user = await User.findOne({user_id:book.user_id});
        const category = await Category.findOne({cat_id:book.category});

        res.render('Admin/db_menu/sell_order_details',{book:book,address:address,user:user,category:category});
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/admin/sell_order_details/:book_id',auth.adminAuth, async (req,res)=>{

    try {

        console.log(req.params.book_id);

        Book.findOneAndUpdate({book_id:req.params.book_id},{available:req.body.available},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else    
                    console.log(updateProfile);
                    res.redirect('/admin/sell_order');
        });
        
    } catch (error) {
        
    }
});

module.exports = router;