const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')


const signUp = (req, res, next) => {
    const { name, email, password, role } = req.body;

    User.findOne({ email })
    .then((checkUser) => {
        if (checkUser) {
            res.status(200).json({message: "Email already in use!"})
        } else {
            bcrypt.hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    name,
                    email,
                    hashedPassword,
                    role
                })

                return user.save()
            }).then((result) => {
                res.status(201).json({message: "User successfuly created", data: result })
            }).catch((err) => {
                throw new Error(err)
            })
        }
    })
    .catch((err) => {
        throw new Error(err)
    })
}


const login = (req, res, next) => {
    const { email, password } = req.body
    let loadedUser;
    
    User.findOne({ email })
    .then((userCheck) => {
        if (!userCheck) {
            throw new Error("User not exist, Please create account or contact to admin!")
        } else if (userCheck.status === 1) {
            throw new Error("User account is not active, Please contact to admin!")
        }
        loadedUser = userCheck;
        return bcrypt.compare(password, loadedUser.password)
    }).then((isEqual) => {
        if (!isEqual) {
            throw new Error("Invalid credential. Please check your email or password!")
        }

        const token = jwt.sign(
            {
                email: loadedUser.email,
                userId: loadedUser._id.toString()
            },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );

        res.status(200).json({ token: token, userId: loadedUser._id.toString() })
    }).catch((err) => {
        throw new Error("Error", err)
    })
}

module.exports = { signUp, login }