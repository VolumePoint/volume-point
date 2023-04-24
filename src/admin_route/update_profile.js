const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const Admin = require('../../db/models/admin');
const adminUpload = require('../../storage/admin');

router.get('/admin/update_profile',auth.adminAuth,async (req,res)=>{

    try {
        Admin.findOne({_id:req.user._id},(err,data)=>{

            if(err){
                res.send(err);
            }
            else{
                res.render('Admin/db_menu/update_profile',{data:data});
            }
        });
    } catch (error) {
        res.status(401).send(error);
    }
});

adminUpdateProfile = (req,res,image) =>{

    try {
         Admin.findOneAndUpdate({_id:req.user._id},{
                fullname:req.body.fullname,
                email:req.body.email,
                phone:req.body.phone,
                address:req.body.address,
                gender:req.body.gender,
                profile_image:image,
            },{new:true},(err,updateProfile)=>{
                if(err)
                    res.send(err);
                else{
                    console.log("Adminside");
                    res.redirect('/admin/my_account');
                }
        });
        
    } catch (error) {
        res.status(400).send(err);
        console.log(err);
    }

    
}

router.post('/admin/update_profile',adminUpload.single('profile_image'),auth.adminAuth,async (req,res)=>{

    try {

        if(req.file){
            console.log(imageName.admin);
            adminUpdateProfile(req,res,imageName.admin);
        }
        else{
            Admin.findOne({_id:req.user._id},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    const foundAdmin =  data;
                    imageName.admin=foundAdmin.profile_image;
                    adminUpdateProfile(req,res,imageName.admin);
                }
            });
        }
        
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }

    
});

module.exports = router;