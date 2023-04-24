const express = require('express');
const router = express.Router();

const User = require('../../db/models/user');
const auth = require('../../middleware/auth');
const userUpload = require('../../storage/user');

router.get('/update_profile',auth.userAuth,async (req,res)=>{

     try {
        User.findOne({_id:req.user._id},(err,data)=>{

            if(err){
                res.send(err);
            }
            else{
                 res.render('User/pages/db_menu/update_profile',{data:data});
            }
        });
    } catch (error) {
        res.status(401).send(error);
    }
   
});

userUpdateProfile = (req,res,image) =>{

     User.findOneAndUpdate({_id:req.user._id},{
            fullname:req.body.fullname,
            email:req.body.email,
            phone:req.body.phone,
            address:req.body.address,
            account_type:req.body.account_type,
            profile_image:image,
    },{new:true},(err,updateProfile)=>{
        if(err)
            res.send(err);
        else{
            console.log("Userside");
            res.redirect('/user_account');
        }
    });
}

router.post('/update_profile/',userUpload.single('profile_image'),auth.userAuth,async (req,res)=>{

         if(req.file){
            // console.log(imageName.user);
            userUpdateProfile(req,res,imageName.user);
        }
        else{
            User.findOne({_id:req.user._id},(err,data)=>{
                if(err)
                    res.send(err);
                else{
                    const foundUser =  data;
                    imageName.user=foundUser.profile_image;
                    userUpdateProfile(req,res,imageName.user);
                }
            });
        }
});

module.exports = router;