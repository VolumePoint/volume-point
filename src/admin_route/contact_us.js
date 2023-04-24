const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const ContactUs = require('../../db/models/contact_us');
const Pagination = require('../../utilities/pagination');

router.get('/admin/contact_us',auth.adminAuth,(req,res)=>{

    ContactUs.find({},(err,data)=>{

        if(err)
            res.send(err);
        else{
            data = data.reverse();
            const page = req.query.page?req.query.page:1;
            const p1 = new Pagination();
            const records = p1.paginate(data,page,4);
            res.render('Admin/db_menu/contact_us',{data:records});
        }

    });
});

module.exports = router;