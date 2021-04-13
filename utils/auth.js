const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.loggedUser = decoded;
        next();
    } catch {
        return res.status(401).json({ message: "Authentication failed" });
    }
}