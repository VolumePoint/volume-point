const express = require('express');
const router = express.Router();
const User = require('../../db/models/user');
const auth = require('../../middleware/auth');

router.get('/admin/user_profile/:email',auth.adminAuth,async (req,res)=>{

    try {
        
        User.findOne({email:req.params.email},(err,data)=>{
            if(err){
                res.send(err);
            }
            else{
                res.render('Admin/db_menu/user_profile',{data:data});
            }
        });        
    } catch (error) {
        res.status(400).send(error);
    }

});

module.exports = router;