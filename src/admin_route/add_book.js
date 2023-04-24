const express = require('express');
const router = express.Router();
const Book = require('../../db/models/book');
const auth = require('../../middleware/auth');
const Category = require('../../db/models/category');
const Pagination = require('../../utilities/pagination');

router.get('/admin/add_book',auth.adminAuth,(req,res)=>{

    try {
        Category.find((err,data)=>{
            if(err)
                res.send(error);
            else    
                res.render('Admin/db_menu/add_book',{data:data});
        });
    } catch (error) {
        res.status(400).send(error);
    }


});

router.post('/admin/add_book',bookUpload.single('book_image'),auth.adminAuth,async (req,res)=>{
    
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
                book_transaction_status:"sell",
                user_id:req.user.admin_id,
                book_image:imageName.book,
                receiving_address:"volumepoint",
                available:true
        });

        const addBook = await book.save();
        console.log(addBook);

        const category = await Category.findOne({cat_id:req.body.category});
         const no_of_books = category.no_of_books + 1;
            
        Category.findOneAndUpdate({cat_id:req.body.category},{no_of_books:no_of_books},{new:true},(err,updateProfile)=>{
                    if(err)
                        res.send(err);
                    else    
                        console.log(updateProfile);
        });

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

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

module.exports = router;