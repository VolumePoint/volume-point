const express = require('express');
const router = express.Router();

const Category = require('../../db/models/category');

router.get('/',async(req,res)=>{

    try {
        Category.find({no_of_books:{$gt:0}},(err,data)=>{
            if(err)
                res.send(err);
            else    
                res.render('User/pages/index',{data:data});
        }).limit(9);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;