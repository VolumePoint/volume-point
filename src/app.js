const express = require("express");
const path = require("path");
const hbs = require("hbs");
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const app = express();
const port = 4000;

var imageName = require('../global');

adminUpload = require('../storage/admin');
categoryUpload = require('../storage/category');
bookUpload = require('../storage/book');
userUpload = require('../storage/user');

const publicPath = path.join(__dirname,"../public");
const viewPath = path.join(__dirname,"../template/views");
// const templatePath = path.join(__dirname,"../template");
const userPartialsPath = path.join(__dirname,'../template/views/User/partials');

require('../db/conn');
const Admin = require('../db/models/admin');
const Category = require('../db/models/category');
const Book = require('../db/models/book');
const User = require('../db/models/user');
const ContactUs = require('../db/models/contact_us');
const Order = require('../db/models/order');
const Address = require('../db/models/address');
const auth = require('../middleware/auth');
// const { type } = require("os");
// const { category } = require("../global");

app.set('view engine','hbs');
app.set('views',viewPath);
hbs.registerPartials(userPartialsPath);
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname,'../uploads')));

const Pagination = require('../utilities/pagination');
const loginRoute = require('./admin_route/login');
const registrationRoute = require('./admin_route/registration');
const dashboardRoute = require('./admin_route/dashboard');
const dashboardMenuRoute = require('./admin_route/dashboard_menu');
const myAccountRoute = require('./admin_route/my_account');
const adminListRoute = require('./admin_route/admin_list');
const updateProfileRoute = require('./admin_route/update_profile');
const adminProfileRoute = require('./admin_route/admin_Profile');
const bookListRoute = require('./admin_route/book_list');
const bookDetailsRoute = require('./admin_route/book_details');
const categoryListRoute = require('./admin_route/category_list');
const addCategoryRoute = require('./admin_route/add_category');
const addBookRoute = require('./admin_route/add_book');
const userListRoute = require('./admin_route/user_list');
const userProfileRoute = require('./admin_route/user_profile');
const changePasswordRoute = require('./admin_route/change_pass');
const logoutRoute = require('./admin_route/logout');
const forgotPasswordRouter = require('./admin_route/forgot_pass');
const contactUsRouter = require('./admin_route/contact_us');
const sellOrderDetailsRouter = require('./admin_route/sell_order_details');
const donateListRoute = require('./admin_route/donate_list');
const buyOrderRoute = require('./admin_route/buy_order');
const addAdminRoute = require('./admin_route/add_admin');
const reportRoute = require('./admin_route/report');

app.use('/',loginRoute);
app.use('/',registrationRoute);
app.use('/',dashboardRoute);
app.use('/',dashboardMenuRoute);
app.use('/',myAccountRoute);
app.use('/',adminListRoute);
app.use('/',updateProfileRoute);
app.use('/',adminProfileRoute);
app.use('/',bookListRoute);
app.use('/',bookDetailsRoute);
app.use('/',categoryListRoute);
app.use('/',addCategoryRoute);
app.use('/',addBookRoute);
app.use('/',userListRoute);
app.use('/',userProfileRoute);
app.use('/',changePasswordRoute);
app.use('/',logoutRoute);
app.use('/',forgotPasswordRouter);
app.use('/',contactUsRouter);
app.use('/',sellOrderDetailsRouter);
app.use('/',donateListRoute);
app.use('/',buyOrderRoute);
app.use('/',addAdminRoute);
app.use('/',reportRoute);


//User Panle

const indexRoute = require('./user_route/index');
const categoryRoute = require('./user_route/category');
const contactUsRoute = require("./user_route/contact_us");
const userLoginRoute = require('./user_route/login');
const userRegistrationRoute = require('./user_route/registration');
const userAccountRoute = require('./user_route/user_account');
const userForgotPasswordRoute = require('./user_route/forgot_pass');
const userChangePasswordRoute = require('./user_route/change_pass');
const userUpdateProfileRoute = require('./user_route/update_profile');
const buyBookRoute = require('./user_route/buy_book');
const userOrderRoute = require('./user_route/user_order');
const userAddBookRoute = require('./user_route/add_book');
const userAddAddressRoute = require('./user_route/add_address');
const bookRoute = require('./user_route/book');
const userDonateBookRoute = require('./user_route/donate_book');
const userBookRoute = require('./user_route/user_book');
const userDonateListRoute = require('./user_route/user_donate');
const userAddToCartRoute = require('./user_route/add_to_cart');
const userCartRoute = require('./user_route/user_cart');
const userLogoutRoute = require('./user_route/logout');
const { options } = require("./admin_route/add_book");

app.use('/',indexRoute);
app.use('/',categoryRoute);
app.use('/',contactUsRoute);
app.use('/',userLoginRoute);
app.use('/',userRegistrationRoute);
app.use('/',userAccountRoute);
app.use('/',userForgotPasswordRoute);
app.use('/',userChangePasswordRoute);
app.use('/',userUpdateProfileRoute);
app.use('/',buyBookRoute);
app.use('/',userOrderRoute);
app.use('/',userAddBookRoute);
app.use('/',userAddAddressRoute);
app.use('/',bookRoute);
app.use('/',userDonateBookRoute);
app.use('/',userBookRoute);
app.use('/',userDonateListRoute);
app.use('/',userAddToCartRoute);
app.use('/',userCartRoute);
app.use('/',userLogoutRoute);


app.get('/dashboard',auth.userAuth,(req,res)=>{
    res.render('User/pages/dashboard');
});

app.get('/db_menu',auth.userAuth,(req,res)=>{
    res.render('User/pages/db_menu');
});

hbs.registerHelper('lt',function(a,b,options){
    if(a < b){
        return options.fn(this);
    }
    else{
        return options.inverse(this);
    }
});


app.get('/donate',(req,res)=>{
    res.render('User/pages/donate');
});


app.use(express.static(publicPath));

app.get('/',(req,res)=>{
    res.send("Welcome to Admin panel");
});

app.listen(port,()=>{
    console.log(`Listening at the port ${port}`);
});