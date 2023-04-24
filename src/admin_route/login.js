const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Admin = require('../../db/models/admin');
const { verify } = require('jsonwebtoken');

router.get('/admin',async (req,res)=>{
    
    try {

    if(!req.cookies.volumepoint)
        res.render('Admin/login');

    else{
        const token = req.cookies.volumepoint;
        const admin = jwt.verify(token,"volumepointisveryhelpfulpaltforfortheusers");
        const verifyAdmin = await Admin.findOne({_id:admin._id});

        if(!verifyAdmin)
            res.render('Admin/login');
        else
            res.redirect('/admin/dashboard');
    }

     } catch (error) {
        res.render('Admin/login');
    }
        
});

router.post('/admin',async(req,res)=>{

    try {
        const email = req.body.email;
        const password = req.body.password;

        const admin = await Admin.findOne({email:email});

        if(admin === null){
            res.send(`<script>alert('please enter valid emailid!');window.history.back();</script>`);
        }

        const isMatch = await bcrypt.compare(password,admin.password);

        if(isMatch){

            const token = admin.token;

            res.cookie("volumepoint",token,{
                expires:new Date(Date.now() + 6000000),
                httpOnly:true
            });

            Admin.findOneAndUpdate({email:email},{active:true},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err); 
                // else    
                //     console.log(updateProfile) ;
            });

            res.redirect('/admin/dashboard');
        }
        else{   
            res.send(`<script>alert('please enter correct password!');window.history.back();</script>`);
        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }

});

module.exports = router;