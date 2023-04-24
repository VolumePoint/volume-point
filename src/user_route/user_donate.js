const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Book = require('../../db/models/book');
const Pagination  = require('../../utilities/pagination');

router.get('/user_donate',auth.userAuth,async (req,res)=>{

    try {

        Book.find({user_id:req.user.user_id,book_transaction_status:"donate"},(err,data)=>{
            if(err){
                console.log(err);
            }
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('User/pages/db_menu/user_donate',{data:records});
            }
        });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;