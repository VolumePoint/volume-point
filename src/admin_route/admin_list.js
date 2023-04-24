const { response } = require('express');
const express = require('express');
const router = express.Router();
const Admin = require('../../db/models/admin');
const auth = require('../../middleware/auth');
const Pagination = require('../../utilities/pagination');

router.get('/admin/admin_list',auth.adminAuth,async (req,res)=>{

    try {
        Admin.find((err,data)=>{
            if(err){
                res.send(err);
            }
            else{
                data = data.reverse();
                const page = req.query.page?req.query.page:1;
                const p1 = new Pagination();
                const records = p1.paginate(data,page,5);
                res.render('Admin/db_menu/admin_list',{data:records});
            }
        });
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
