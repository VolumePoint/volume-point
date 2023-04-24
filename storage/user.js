const multer = require('multer');
const path = require('path');

imageName = require('../global');

const userStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/user');
    },
    filename: (req,file,cb) => {
        console.log(file);
        imageName.user = Date.now() + path.extname(file.originalname);
        cb(null, imageName.user) ;
    }
});
const userUpload = multer({storage:userStorage});

module.exports = userUpload;