const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Cart = require('../../db/models/cart');
const Book = require('../../db/models/book');
const User = require('../../db/models/user');
const Pagination = require('../../utilities/pagination');
const { book } = require('../../global');

router.get('/user_cart',auth.userAuth,async(req,res)=>{

    try {
        const cart = await Cart.find({user_id:req.user.user_id});

        if(Object.keys(cart).length === 0){
            res.render('User/pages/db_menu/user_cart');
        }
        
        var c = 0;
        var l = cart.length;
        var bookData = [];

        cart.forEach(cart_item => {

            Book.find({book_id:cart_item.book_id},(err,book)=>{
                if(err)
                    res.send(err);
                else{
                    bookData[c]=book[0];
                    bookData[c]['cart_id']=cart_item.cart_item_id;
                    c++;
                    if( c === l){
                        bookData = bookData.reverse();
                        const page = req.query.page?req.query.page:1;
                        const p1 = new Pagination();
                        const records = p1.paginate(bookData,page,6);
                        res.render('User/pages/db_menu/user_cart',{bookData:records});
                    }
                }
            });
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user_cart/delete/:cart_id',auth.userAuth,async (req,res)=>{

    try {

        const deleteCartItem = await Cart.deleteOne({cart_item_id:req.params.cart_id,user_id:req.user.user_id});

        if(!req.params.cart_id)  
            return res.status(400).send();
        else{
            res.redirect('/user_cart');
        }

    } catch (error) {
        return res.status(400).send();
    }
});

module.exports = router;

