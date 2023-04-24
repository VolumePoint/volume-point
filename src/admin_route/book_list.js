const express = require('express');
const router = express.Router();
const Book = require('../../db/models/book');
const auth = require('../../middleware/auth');
const Pagination = require('../../utilities/pagination');

router.get('/admin/book_list',auth.adminAuth,async (req,res)=>{
    
    Book.find({book_transaction_status:"sell",available:true},(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            data = data.reverse();
            const page = req.query.page?req.query.page:1;
            const p1 = new Pagination();
            const records = p1.paginate(data,page,6);
            res.render('Admin/db_menu/book_list',{data:records});
        }
    });    
});

router.get('/admin/book_list/:cat_id',auth.adminAuth,async (req,res)=>{
    
    Book.find({category:req.params.cat_id,book_transaction_status:"sell",available:true},(err,data)=>{
        if(err){
            res.send(err);
        }
        else{
            data = data.reverse();
            const page = req.query.page?req.query.page:1;
            const p1 = new Pagination();
            const records = p1.paginate(data,page,6);
            res.render('Admin/db_menu/book_list',{data:records});
        }
    });    
});

module.exports = router;