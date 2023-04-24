const express = require('express');
const router = express.Router();

const ContactUs = require('../../db/models/contact_us');

router.get('/contact_us',(req,res)=>{
    res.render('User/pages/contact_us');
});

router.post('/contact_us',async(req,res)=>{

    try {
        
        const c1 = new ContactUs({
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
            message:req.body.message,
        });

        const result = await c1.save();
        console.log(result);
        
        res.redirect('/');
        

    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;