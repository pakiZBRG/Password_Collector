const { check } = require('express-validator');

exports.validRegister = [
    check('email', 'Email is required').isEmail().withMessage('Must be a valid email address'),
    check('password', 'Password is required').notEmpty(),
    check('password').isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/).withMessage('Password must contain a number')
        .matches(/[A-Z]/).withMessage('Password: at least one uppercase letter')
]

exports.validLogin = [
    check('email').isEmail()
        .withMessage('Must be a valid email address'),
    check('password', "Password is requried").notEmpty(),
    check('password')
        .isLength({ min: 8 })
        .withMessage('Password must contain at least 8 characters')
        .matches(/\d/).withMessage('Password must contain a number')
]

exports.validEmail = [
    check('email', 'Email is required').isEmail().withMessage('Must be a valid email address')
]