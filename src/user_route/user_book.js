const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Book = require('../../db/models/book');
const Pagination = require('../../utilities/pagination');

router.get('/user_book',auth.userAuth,async (req,res)=>{

    try {
        
       Book.find({user_id:req.user.user_id,book_transaction_status:"sell"},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('User/pages/db_menu/user_book',{data:records});
            }
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/user_book_details/:book_id',auth.userAuth,async (req,res)=>{
    console.log(req.params.book_id);

    try {

        Book.findOne({book_id:req.params.book_id},(err,data)=>{
            if(err)
                res.send(err);
            else{
                res.render('User/pages/db_menu/user_book_details',{data:data});
            }
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;