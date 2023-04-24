const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');
const auth = require('../../middleware/auth');
const Pagination = require('../../utilities/pagination');

router.get('/admin/user_list',auth.adminAuth,(req,res)=>{


    try {

        User.find((err,data)=>{
            if(err)
                res.send(err);
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,6);
                res.render('Admin/db_menu/user_list',{data:records});
            }
        }); 
        
    } catch (error) {
        res.status(400).send(error);
    }
    
});


module.exports = router;