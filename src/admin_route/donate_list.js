const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../db/models/user');
const Book = require('../../db/models/book');
const Pagination = require('../../utilities/pagination');

router.get('/admin/donate_list',auth.adminAuth,async (req,res)=>{

    try {

        Book.find({book_transaction_status:"donate"},(err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,10);
                res.render('Admin/db_menu/sell_order',{data:records});
            }
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;