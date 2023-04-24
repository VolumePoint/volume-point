const multer = require('multer');
const path = require('path');

imageName = require('../global');

const adminStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/admin');
    },
    filename: (req,file,cb) => {
        console.log(file);
        imageName.admin = Date.now() + path.extname(file.originalname);
        // console.log("Image Name is in storage:"+imageName.admin);
        cb(null, imageName.admin) ;
    }
});
const adminUpload = multer({storage:adminStorage});


module.exports = adminUpload;