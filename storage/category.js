const multer = require('multer');
const path = require('path');

imageName = require('../global');

const categoryStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/category');
    },
    filename: (req,file,cb) => {
        console.log(file);
        imageName.category = Date.now() + path.extname(file.originalname);
        cb(null, imageName.category) ;
    }
});
const categoryUpload = multer({storage:categoryStorage});

module.exports = categoryUpload;