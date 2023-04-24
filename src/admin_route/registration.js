const express = require('express');
const router = express.Router();

const Admin = require('../../db/models/admin');

router.get('/admin/registration',(req,res)=>{
    res.render('Admin/registration');
});

router.post('/admin/registration',adminUpload.single('profile_image'),async(req,res)=>{

    try { 

        const password = req.body.password;
        const c_password = req.body.c_password;

        const fullname = req.body.fullname;
        const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const admin_id = fullname.split(" ").shift() + minutes + second;

        if(password === c_password){    
            const u1 = new Admin({
                admin_id:admin_id,
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address,
                gender: req.body.gender,
                profile_image:imageName.admin,
                active:true,
            });

            const token = await u1.generateToken();
            console.log(token);
            
            res.cookie("volumepoint",token);

            const addAdmin = await u1.save();

            res.redirect('/admin/dashboard');
        }
        else{
            res.send('passwords are not matching');
        }

    } catch (error) {
        res.status(400).send(error);
        console.log(error);
    }
});

module.exports = router;