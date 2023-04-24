const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

// ,
router.get('/admin/dashboard',auth.adminAuth,async (req,res)=>{
    
        res.render('Admin/dashboard');
});

module.exports = router;



