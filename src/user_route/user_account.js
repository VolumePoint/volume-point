const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');
const auth = require('../../middleware/auth');

router.get('/user_account',auth.userAuth,async (req,res)=>{

    try {
        
         User.findOne({_id:req.user._id},(err,data)=>{
            if(err){
                res.send(err);
            }
            else{
                res.render('User/pages/db_menu/user_account',{data:data});
            }
        });

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;