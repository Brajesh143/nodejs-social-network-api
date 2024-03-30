const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user');
const { exists } = require('../models/post');

// const signUp = (req, res, next) => {
//     const { name, email, password } = req.body;

//     bcrypt.hash(password, 12)
//     .then(hashedPassword => {
//         const user = new User({
//             name,
//             email,
//             hashedPassword
//         })

//         return user.save()
//     })
//     .then((result) => {
//         res.status(201).json({message: "User successfuly created", data: result })
//     }).catch((err) => {
//         throw new Error(err)
//     })
// }

const signUp = asyncHandler(async (req, res, next) => {
    const {name, email, password, role, status} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12)

    try {
        const checkUser = await User.findOne({ email })
        if (checkUser) {
            throw new Error("Email already in use. Please use another email")
        }

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role, 
            status
        });

        if (newUser) {
            res.status(201).json({ message: "User created successfuly", data: newUser })
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        })
    }
});

const login = asyncHandler(async (req, res, next) => {
    const { email,  password} = req.body;
    
    try {
        const user = await User.findOne({ email })
        if (!user) {
          res.status(400).json({
            message: "Login not successful",
            error: "User not found",
          })
        } else {
          // comparing given password with hashed password
          bcrypt.compare(password, user.password).then(function (result) {
            if (result ) {
                const token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id.toString()
                    },
                    'somesupersecretsecret',
                    {expiresIn: '1h' }
                )
                res.status(200).json({
                    message: "Login successful",
                    token: token,
                    data: user

                })
            } else {
                res.status(400).json({ message: "Credential not matched" })
            } 
          })
        }
    } catch (error) {
        res.status(400).json({
          message: "An error occurred",
          error: error.message,
        })
    }
})

const statusUpdate = asyncHandler(async (req, res, next) => {
    const { status } = req.body;
    const user_id = req.userId;

    try {
        if (user_id !== null) {
            const updatedUser = await User.findByIdAndUpdate(req.userId, req.body, {new: false});

            if (updatedUser) {
                res.status(200).json({
                    message: "Status Updated Successfuly"
                })
            }
        } else {
            res.status(404).json({
                message: "Token not found. Please add token!"
            })
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        })
    }
})

const userUpdate = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    const { name, email } = req.body
    
    try {
        const user = await User.findById(user_id)
        const checkEmail = await User.findOne({ email })

        if (checkEmail && email !== user.email) {
            res.status(500).json({ message: "This email already exist. Please add other email!"})
        }

        user.name = name
        user.email = email
        await user.save()
        // const user = User.findByIdAndUpdate({ _id: user_id }, { name: name, email: email }, { upsert: true });

        res.status(200).json({message: "User has been updated"})
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        })
    }
})

const getUserDetails = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    try {
        const user = await User.findById(user_id)
        if (!user) {
            res.status(200).json({ message: "User not found" })
        }

        res.status(200).json({ message: "User details", data: user })
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: error.message,
        })
    }
})

const getUsers = asyncHandler(async (req, res, next) => {
    const user_id = req.userId;
    
    try {
        const user = await User.findById(user_id);
        if (user && user.role === 'Admin') {
            const users = await User.find({ role: { $ne: 'Admin' }})
            
            res.status(200).json({ message: "Users list", data: users })
        } else {
            res.status(403).json({ message: "You are not authorized" })
        }
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const forgotPassword = asyncHandler(async (req, res, next) => {
    // send mail to reset password
})

const resetPassword = asyncHandler(async (req, res, next) => {
    // reset password
})

const logout = asyncHandler(async (req, res, next) => {
    // logout user
})

module.exports = { signUp, login, statusUpdate, userUpdate, getUserDetails, getUsers, forgotPassword, resetPassword, logout }