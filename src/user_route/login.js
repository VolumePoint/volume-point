const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const User = require('../../db/models/user');
const bcrypt = require('bcryptjs');

router.get('/login',(req,res)=>{
    res.render('User/pages/login');
});

router.post('/login',async(req,res)=>{

    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({email:email});

        if(user === null){
            res.send(`<script>alert('please enter valid emailid!');window.history.back();</script>`);
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(isMatch){

            const token = user.token;

            res.cookie("volumepoint",token,{
                expires:new Date(Date.now() + 6000000),
                httpOnly:true
            });

            User.findOneAndUpdate({email:email},{active:true},{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                // else
                //     console.log(updateProfile);
            });

            res.redirect('/dashboard');
        }
        else{
            res.send(`<script>alert('please enter correct password!');window.history.back();</script>`);
        }

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;