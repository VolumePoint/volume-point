const multer = require('multer');
const path = require('path');

imageName = require('../global');

const bookStorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,'uploads/book');
    },
    filename: (req,file,cb) => {
        console.log(file);
        imageName.book = Date.now() + path.extname(file.originalname);
        console.log(imageName.book);
        cb(null, imageName.book) ;
    }
});
const bookUpload = multer({storage:bookStorage});

module.exports = bookUpload;