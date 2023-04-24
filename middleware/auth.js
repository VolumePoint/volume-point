const jwt = require('jsonwebtoken');
const Admin = require('../db/models/admin');
const User = require('../db/models/user');


const adminAuth = async (req,res,next) => {

    //console.log("Admin Authentication executed");

    try {
        const token = req.cookies.volumepoint;
        const admin = jwt.verify(token,"volumepointisveryhelpfulpaltforfortheusers");
        const verifyAdmin = await Admin.findOne({_id:admin._id});
        req.user = verifyAdmin;

        if(!verifyAdmin)
            return res.redirect('/admin');
        next();

    } catch (error) {
        return res.redirect('/admin');
    }
}

const userAuth = async (req,res,next) => {

       // console.log("User Authentication executed");

        try {
            const token = req.cookies.volumepoint;
            const user = jwt.verify(token,"volumepointisveryhelpfulpaltforfortheusers");
            const verifyUser = await User.findOne({_id:user._id});
            req.user = verifyUser;

            if(!verifyUser)
                return res.redirect('/login');
            next();
        } catch (error) {
            return res.redirect('/login');
        }
}

module.exports = {adminAuth,userAuth};

