const express = require('express');
const router = express.Router();
const Category = require('../../db/models/category');
const auth = require('../../middleware/auth');
const Pagination = require('../../utilities/pagination');

router.get('/admin/category_list',auth.adminAuth,(req,res)=>{

    try {
        Category.find((err,data)=>{
            if(err){
                res.send(err);
            }
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('Admin/db_menu/category_list',{data:records});
            }
        });
    } catch (error) {
        return res.status(400).send();
    }
});

router.get('/admin/category_list/delete/:cat_id',async (req,res)=>{

    try {

        console.log(req.params.cat_id);

        const deleteCategory = await Category.deleteOne({cat_id:req.params.cat_id});

        if(!req.params.cat_id)  
            return res.status(400).send();
        else
            // console.log(deleteCategory);
            res.redirect('/admin/category_list');

    } catch (error) {
        return res.status(400).send();
    }
});


module.exports = router;