const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');

router.get('/registration',(req,res)=>{
    res.render('User/pages/registration');
});

router.post('/registration',userUpload.single('profile_image'),async (req,res)=>{
    try {
        
        const password = req.body.password;
        const c_password = req.body.c_password;

        const fullname = req.body.fullname;
        const date =  new Date();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const userId = fullname.split(" ").shift() + minute + second;

        if(password === c_password){

            const user = new User({
                user_id:userId,
                fullname:req.body.fullname,
                email:req.body.email,
                password:req.body.password,
                phone:req.body.phone,
                address:req.body.address,
                gender:req.body.gender,
                account_type:req.body.account_type,
                profile_image:imageName.user,
                active:true,
            });

            const token = await user.generateToken();
            res.cookie("volumepoint",token);

            const regiUser = await user.save();

            res.redirect('/dashboard');
        }
        else{
            res.send(`<script>alert('passwords are not matched!');window.history.back();</script>`);
        }

    } catch (error) {
        console.log(error);    
        res.status(400).send(error);
    }
    
});

module.exports = router;