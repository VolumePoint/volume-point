const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const Admin = require('../../db/models/admin');

router.get('/admin/change_password',auth.adminAuth,async (req,res)=>{
    res.render('Admin/db_menu/change_pass');
});

router.post('/admin/change_password',auth.adminAuth,async (req,res)=>{

    try {

        var password = req.body.password;
        var c_password = req.body.c_password;

        if(password === c_password){

            password = await bcrypt.hash(password,10);

            console.log(password);

            Admin.findOneAndUpdate({_id:req.user._id},{
                password:password
            },{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else
                    console.log(updateProfile);
                    res.redirect('/admin/my_account');
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