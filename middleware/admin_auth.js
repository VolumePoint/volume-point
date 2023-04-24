const jwt = require('jsonwebtoken');
const Admin = require('../db/models/admin');
const User = require('../db/models/user');


const adminAuth = async (req,res,next) => {

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


module.exports = adminAuth;

