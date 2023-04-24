const express = require('express');
const router = express.Router();

const Category = require('../../db/models/category');
const Pagination = require('../../utilities/pagination');

router.get('/category',async (req,res)=>{

    try {

        Category.find({no_of_books:{$gt:0}},(err,data)=>{
            if(err)
                res.send(err);
            else{
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data, page, 9);
                // console.log(records);
                res.render('User/pages/category',{data:records});
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;