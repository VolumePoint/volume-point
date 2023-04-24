const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Cart = require('../../db/models/cart');

router.get('/add_to_cart',auth.userAuth,async (req,res)=>{

    try {

        const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const user_id = req.user.user_id;
        const book_id = req.query.book_id

        const cart_id = user_id.substring(0,4) + book_id.substring(0,4) + second + minutes;

        const cartItem = new Cart({
            cart_item_id:cart_id,
            book_id:book_id,
            user_id:user_id,
        });

        const addItem = await cartItem.save();

        // console.log(addItem);
        
        // console.log(book_id);
        // console.log(user_id);
        // console.log(cart_id);

        // res.send(`<script>alert('Added to your cart');window.history.back();</script>`);
        res.redirect('/book');

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;