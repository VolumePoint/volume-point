const express = require('express');
const router = express.Router();
const Category = require('../../db/models/category');
const Book = require('../../db/models/book');
const auth = require('../../middleware/auth');
const User = require('../../db/models/user');

router.get('/admin/book_details/:book_id',auth.adminAuth,async (req,res)=>{

    try {

        console.log('req.params.book_id'+req.params.book_id);

        const book = await Book.findOne({book_id:req.params.book_id,book_transaction_status:'sell',available:true});

        const user = await User.findOne({user_id:book.user_id});
        const category = await Category.findOne({cat_id:book.category});

        res.render('Admin/db_menu/book_details',{book:book,user:user,category:category});
    } catch (error) {
        res.status(400).send(error);
    }
  
});

module.exports = router;