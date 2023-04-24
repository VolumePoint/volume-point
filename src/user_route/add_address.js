const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Address = require('../../db/models/address');
const Book = require('../../db/models/book');
const Category = require('../../db/models/category');
const sendMail = require('../../send_mail');

router.get('/add_address',auth.userAuth,(req,res)=>{
    res.render('User/pages/add_address');
});

router.post('/add_address',auth.userAuth,async (req,res)=>{

    
    try {

        const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const house_no = req.body.house_no;
        const address_id = house_no + minutes + second;

        const address = new Address({
            address_id : address_id,
            house_no : house_no,
            society_name : req.body.society ,
            area_name : req.body.area_name,
            nearby_location :  req.body.nearby ,
            city : req.body.city ,
            pincode : req.body.pincode ,
            state : req.body.state ,
        });

        const res1 = await address.save();
        // console.log(res1);

        const book = new Book({
            book_id:req.body.book_id,
            title:req.body.title,
            category:req.body.category,
            author:req.body.author,
            language:req.body.language,
            price:req.body.price,
            no_of_pages:req.body.no_of_pages,
            quanity:req.body.quanity,
            publisher:req.body.publisher,
            publication_date:req.body.publication_date,
            country_of_origin:req.body.country_of_origin,
            book_condition:req.body.book_condition,
            description:req.body.description,
            book_transaction_status:req.body.book_transaction_status,
            user_id:req.user.user_id,
            book_image:req.body.book_image,
            receiving_address:address_id,
            available:req.body.available,
        });

        const addBook = await book.save();
        // console.log(addBook);

        if(req.body.book_transaction_status == "sell"){

            const category = await Category.findOne({cat_id:req.body.category});
            const no_of_books = category.no_of_books + 1;
            
            Category.findOneAndUpdate({cat_id:req.body.category},{no_of_books:no_of_books},{new:true},(err,updateProfile)=>{
                    if(err)
                        res.send(err);
                    // else    
                        // console.log(updateProfile);
            });
            sendMail.forSell(req.body.book_id);
        }
        else{
            sendMail.forDonate(req.body.book_id);
        }
        
        res.redirect('/dashboard');
    } catch (error) {
        
        res.status(400).send(error);
    }
    
});

module.exports = router;