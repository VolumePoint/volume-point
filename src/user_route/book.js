const express = require('express');
const router = express.Router();

const Pagination = require('../../utilities/pagination');
const Book = require('../../db/models/book');
const Category = require('../../db/models/category');

router.get('/book',async (req,res)=>{
    try {
         Book.find({book_transaction_status:"sell",quanity:{$gt:0},available:true},(err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                 const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('User/pages/book',{data:records});
            }
         });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/book/:cat_id',async (req,res)=>{
    try {

        console.log(req.params.cat_id);

         Book.find({category:req.params.cat_id,book_transaction_status:"sell",quanity:{$gt:0},available:true},(err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                 const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('User/pages/book',{data:records});
            }
         });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/book_title',async (req,res)=>{
    try {

        console.log('book/title is working');
        console.log('${req.body.title}'+req.query.title);

         Book.find({title:req.query.title,book_transaction_status:"sell",quanity:{$gt:0},available:true},(err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                 const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('User/pages/book',{data:records});
            }
         });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/book_details',async (req,res)=>{
    
    try {

        const book = await Book.findOne({book_id:req.query.book_id,quanity:{$gt:0}});
        const category = await Category.findOne({cat_id:book.category});
        
        res.render('User/pages/book_details',{book:book,category:category});

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;