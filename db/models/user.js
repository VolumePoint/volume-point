const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    user_id:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        index:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('Email is not valid');
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number,
        required:true,
        unique:true,
        index:true,
    },
    address:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        required:true,
    },
    account_type:{
        type:String,
        required:true,
    },
    regi_date:{
        type:Date,
        required:true,
        default:Date.now,
    },
    profile_image:{
        type:String,
        required:true,
    },
    token:{
            type:String,
            required:true
    },
    active:{
        type:Boolean,
        required:true,
    },
});

userSchema.methods.generateToken = async function(){

    try {
        const token = jwt.sign({_id:this._id},"volumepointisveryhelpfulpaltforfortheusers");
        this.token = token;
         await this.save();
        // console.log(token);
        return token;

    } catch (error) {
        console.log(error);
    }
}

userSchema.pre("save",async function(next){

    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10);
        // console.log(this.password);
    }
    next();
});

const User = new mongoose.model("User",userSchema);

User.createIndexes();

module.exports = User;