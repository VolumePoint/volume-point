const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

router.get('/admin/dashboard_menu',auth.adminAuth,(req,res)=>{
    res.render('Admin/dashboard_menu');
});

module.exports = router;