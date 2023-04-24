const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../db/models/user');

router.get('/logout',auth.userAuth,(req,res)=>{

    User.findOneAndUpdate({user_id:req.user.user_id},{active:false},{new:true},(err,updateProfile)=>{
        if(err)
            res.send(err);  
        // else    
        //     console.log(updateProfile);
    });

    res.clearCookie('volumepoint');
    res.send('<script>window.top.location.href = "/";</script>');
});

module.exports = router;