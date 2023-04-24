const express = require('express');
const router = express.Router();

const Admin = require('../../db/models/admin');
const auth = require('../../middleware/auth');

router.get('/admin/add_admin',auth.adminAuth,async (req,res)=>{
    res.render('Admin/db_menu/add_admin');
});

router.post('/admin/add_admin',adminUpload.single('profile_image'),auth.adminAuth,async(req,res)=>{

    try { 

        const fullname = req.body.fullname;
        const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const admin_id = fullname.split(" ").shift() + minutes + second;

            const u1 = new Admin({
                admin_id:admin_id,
                fullname: req.body.fullname,
                email: req.body.email,
                password: req.body.password,
                phone: req.body.phone,
                address: req.body.address,
                gender: req.body.gender,
                profile_image:imageName.admin,
                active:false,
                token:"0000"
            });
            const token = await u1.generateToken();
            const addAdmin = await u1.save();

            res.redirect('/admin/admin_list');

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;