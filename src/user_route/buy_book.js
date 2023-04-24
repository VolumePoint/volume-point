const express = require('express');
const router = express.Router();
const Order = require('../../db/models/order');
const Address = require('../../db/models/address');
const auth = require('../../middleware/auth');

const nodemailer = require('nodemailer');
const User = require('../../db/models/user');
const Book = require('../../db/models/book');
const Category = require('../../db/models/category');
const sendMail = require('../../send_mail');
const Cart = require('../../db/models/cart');


router.get('/buy_book',auth.userAuth,(req,res)=>{
    res.render('User/pages/buy_book',{book_id:req.query.book_id});
});

router.post('/buy_book/:book_id',auth.userAuth,async (req,res)=>{

    try {

        const book_id = req.params.book_id;
        const book = await Book.findOne({book_id:book_id});

        var book_qty = book.quanity; 
        var book_price = book.price;
        var qauntity = req.body.qauntity; 

        if(qauntity > book_qty){
            res.send(`<script>alert('Qauntity is not available!');window.history.back();</script>`);
        }
        else{

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

            const order_item_id = book_id + req.user.user_id + minutes + second;
            const order_id = req.user.user_id + book_id + minutes + second;
            const item_total = book_price * qauntity;
            const no_of_item = 1;
            const total = item_total * no_of_item;

            const orderitem = new Order.OrderItem({
                order_item_id:order_item_id,
                book_id:book_id,
                order_id:order_id,
                quantity:qauntity,
                item_total:item_total,
            });

            const  res2 = await orderitem.save();           

            const userorder = new Order.Order({
                order_id: order_id,
                customer_name: req.body.fullname,
                phone: req.body.phone,            
                user_id:req.user.user_id,
                address_id:address_id,
                no_of_item:no_of_item,
                total:total,
                delivered:false,
            });

            const res3 = await userorder.save();

            book_qty = book_qty - qauntity; // 

            Book.findOneAndUpdate({book_id:book_id},{quanity:book_qty},{new:true},(err,updateProfile)=>{
                    if(err)
                        res.send(err);
                    // else    
                    //     console.log(updateProfile);
            });

            if(book_qty <= 0){

                const category = await Category.findOne({cat_id:book.category});

                var no_of_books = category.no_of_books - 1;
                no_of_books<0?0:no_of_books;

                
                Category.findOneAndUpdate({cat_id:category.cat_id},{no_of_books:no_of_books},{new:true},(err,updateProfile)=>{
                        if(err)
                            res.send(err);
                        else    
                            console.log(updateProfile);
                });
            }

            const address_data = await Address.findOne({address_id:address_id});
            const user_data = await User.findOne({user_id:req.user.user_id});
            const order_data = await Order.Order.findOne({order_id:order_id});
            const order_item_data = await Order.OrderItem.find({order_id:order_id});

            sendMail.forBuy(order_id);
            res.render('User/pages/invoice',{order:order_data,address:address_data,user:user_data,order:order_data});
        }

        

    } catch (error) {
        res.status(400).send(error);
    }
});

router.get('/buy_cart',auth.userAuth,async (req,res)=>{

    try {
        res.render('User/pages/db_menu/buy_cart');

    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/buy_cart',auth.userAuth,async (req,res)=>{

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

        const cart_item = await Cart.find({user_id:req.user.user_id});
        
        const no_of_items = cart_item.length;
        var total_price = 0;

        const order_id =  "order" + req.user.user_id + minutes + second;

        var c = 0;

        cart_item.forEach(item => {

            Book.findOne({book_id:item.book_id},async (err,book)=>{

                if(err)
                    res.send(err);
                else{

                    const order_item_id = book['book_id'] + req.user.user_id + minutes + second;
                    const item_total = 1 * book['price'];
                    total_price = total_price + item_total;

                    const orderitem = new Order.OrderItem({
                        order_item_id:order_item_id,
                        book_id:book['book_id'],
                        order_id:order_id,
                        quantity:1,
                        item_total:item_total,
                    });
                    const res2 = await orderitem.save();

                    const book_qty = book['quanity'] - 1;

                    Book.findOneAndUpdate({book_id:book['book_id']},{quanity:book_qty},{new:true},(err,updateProfile)=>{
                        if(err)
                            res.send(err);
                        // else    
                        //     console.log(updateProfile);
                    });

                    if(book_qty <= 0){

                        const category = await Category.findOne({cat_id:book.category});

                        const no_of_books = category.no_of_books - 1;
                        
                        Category.findOneAndUpdate({cat_id:category.cat_id},{no_of_books:no_of_books},{new:true},(err,updateProfile)=>{
                                if(err)
                                    res.send(err);
                                // else    
                                    // console.log(updateProfile);
                        });
                    }

                    c++;

                    if(c == no_of_items){
                        const userorder = new Order.Order({
                            order_id: order_id,
                            customer_name: req.body.fullname,
                            phone: req.body.phone,            
                            user_id:req.user.user_id,
                            address_id:address_id,
                            no_of_item:no_of_items,
                            total:total_price,
                            delivered:false,
                        });

                        const res3 = await userorder.save();
                        res.redirect('/user_order_details/'+order_id);
                        sendMail.forBuy(order_id);
                    }
                }
            })
        });

        

    } catch (error) {
        res.status(400).send(error);
    }
});



module.exports = router;