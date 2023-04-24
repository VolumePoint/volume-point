const mongoose = require('mongoose');

mongoose.connect('mongodb://0.0.0.0:27017/VolumePoint').then(()=>{console.log('connection successfull')}).catch((error)=>{console.log(error)});
