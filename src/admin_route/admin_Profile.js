const express = require('express');
const router = express.Router();
const Admin = require('../../db/models/admin');
const auth = require('../../middleware/auth');

router.get('/admin/admin_profile/:admin_id',auth.adminAuth,async (req,res)=>{

    try {
        console.log(req.params.admin_id);
        Admin.findOne({admin_id:req.params.admin_id},(err,data)=>{
                if(err){
                    res.send(err);
                }
                else{
                    res.render('Admin/db_menu/admin_profile',{data:data});
                }
            });
        
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
