const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Admin = require('../../db/models/admin');

router.get('/admin/logout',auth.adminAuth,(req,res)=>{

    Admin.findOneAndUpdate({admin_id:req.user.admin_id},{active:false},{new:true},(err,updateProfile)=>{
        if(err)
            res.send(err);
        // else
        //     console.log(updateProfile);
    });

    res.clearCookie('volumepoint');
    res.send('<script>window.top.location.href = "/admin";</script>');
});

module.exports = router;