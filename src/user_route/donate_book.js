const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const Book = require('../../db/models/book');
const Category = require('../../db/models/category');
const sendMail = require('../../send_mail');

router.get('/donate_book',auth.userAuth,async (req,res)=>{
    try {

        console.log('working');

        Category.find((err,data)=>{
            if(err)
                res.send(err);
            else{
                console.log("data"+data);
                res.render('User/pages/donate_book',{data:data});
            }
                
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/donate_book',bookUpload.single('book_image'),auth.userAuth,async (req,res)=>{

    try {
        var title = req.body.title;

         const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const book_id = title.split(" ").shift() + minutes + second;

      
        const book = new Book({
                book_id:book_id,
                title:title,
                category:req.body.category,
                author:req.body.author,
                language:req.body.language,
                price:req.body.price,
                no_of_pages:req.body.no_of_pages,
                quanity:req.body.quantity,
                publisher:req.body.publisher,
                publication_date:req.body.publication_date,
                country_of_origin:req.body.country_of_origin,
                book_condition:req.body.book_condition,
                description:req.body.description,                
                book_transaction_status:"donate",
                user_id:req.user.usre_id,
                book_image:imageName.book,
                receiving_address:"0000",
                available:false
        });

        // console.log("Working");
        // console.log(book);
        res.render('User/pages/add_address',{book:book});
        

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

module.exports = router;