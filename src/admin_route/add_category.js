const express = require('express');
const router = express.Router();
const Category = require('../../db/models/category');
const auth = require('../../middleware/auth');

router.get('/admin/add_category',auth.adminAuth,async (req,res)=>{
    res.render('Admin/db_menu/add_category');
});

router.post('/admin/add_category',categoryUpload.single('cat_image'),auth.adminAuth,async (req,res)=>{
    try {

        var cat_name = req.body.cat_name;

        const date = new Date();
        const second = date.getSeconds();
        const minutes =  date.getMinutes();

        const cat_id = cat_name.split(" ").shift() + minutes + second;

        const cat = new Category({
            cat_id:cat_id,
            cat_name:cat_name,
            cat_image:imageName.category,
            description:req.body.description,
        });

        const addcat = await cat.save();
        res.redirect('/admin/category_list');
        console.log(addcat);

    } catch (error) {
        res.status(400).send(error);
    }
});


module.exports = router;