const Password = require('../model/Password');
const { errorHandler } = require('../utils/errorHandler');

exports.newPassword = (req, res) => {
    console.log(req.body.website, req.body.email, req.body.password,)
}