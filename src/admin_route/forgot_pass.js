const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Admin = require('../../db/models/admin');
const { response } = require('express');

router.get('/admin/forgot_pass',(req,res)=>{
    res.render('Admin/forgot_pass'); 
});

router.post('/admin/forgot_pass',async (req,res)=>{

    try {
        const email = req.body.email;
        var password = req.body.password;
        var c_password = req.body.c_password;

        // console.log(email);
        // console.log(password);
        // console.log(c_password);

        if( password === c_password){

            password = await bcrypt.hash(password,10);

             Admin.findOneAndUpdate({email:email},{password:password},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else    
                    // console.log(updateProfile);
                    res.redirect('/admin');
             });
        }
        else{
            res.send(`<script>alert('Passwords are not matching!');window.history.back();</script>`);
        }

    } catch (error) {
        res.status(401).send(error);
    }
    
});

module.exports = router;