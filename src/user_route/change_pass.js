const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');

router.get('/change_password',auth.userAuth,(req,res)=>{
    res.render('User/pages/db_menu/change_pass');
});

router.post('/change_password',auth.userAuth,async (req,res)=>{

    try {

        var password = req.body.password;
        var c_password = req.body.c_password;

        if(password === c_password){

            password = await bcrypt.hash(password,10);

            // console.log(password);

            User.findOneAndUpdate({_id:req.user._id},{password:password},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else
                    // console.log(updateProfile);
                    res.redirect('/user_account');
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