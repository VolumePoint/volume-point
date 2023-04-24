const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../../db/models/admin');
const auth = require('../../middleware/auth');

router.get('/admin/my_account',auth.adminAuth,async (req,res)=>{
 
     try { 

        Admin.findOne({_id:req.user._id},(err,data)=>{
            if(err){
                res.send(err);
            }
            else{ 
                res.render('Admin/db_menu/my_account',{data:data}); // data=admin 
            }
        });

    } catch (error) {
        res.status(401).send(error);
    }
});

module.exports = router;


//authentication 
//if matched show the data
//else login 
// store the cookie in browser & database
