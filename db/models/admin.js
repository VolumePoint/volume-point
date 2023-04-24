const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    admin_id: {
        type: String,
        required: true,
        unique: true,
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is not valid');
            }
        }
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    address: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    regi_date: {
        type: Date,
        default: Date.now
    },
    token:{
            type: String,
            required: true
    },
    profile_image: {
        type: String,
        required: true
    },
    active:{
        type:Boolean,
        required:true,
    }
});

adminSchema.methods.generateToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id }, "volumepointisveryhelpfulpaltforfortheusers");
        this.token = token;
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

adminSchema.pre("save", async function (next) {

    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
        // console.log(this.password);
    }
    next();
});

const Admin = new mongoose.model('Admin', adminSchema);

module.exports = Admin;