const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

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
            name, email, hashedPassword, role, status
        });

        if (newUser) {
            res.status(201).json({ message: "User created successfuly", data: newUser })
        }
    } catch (err) {
        throw new Error(err)
    }
});

const login = asyncHandler(async (req, res, next) => {
    const { email,  password} = req.body;
    
    // try {
        let userData;
        const checkEmail = await User.findOne({ "email": email });
        userData = checkEmail;
        console.log(userData, userData.password)
        if (!checkEmail) {
            throw new Error("Account not exist. Please create new account!")
        } else if (checkEmail.status === 'Inactive') {
            throw new Error("Your account is inactive. Please contact to admin!")
        }

        // const hashedPassword = await bcrypt.hash(password, 12);
        const comparePassword = await bcrypt.compare(password, checkEmail.password)
        console.log("compahgh", comparePassword)
        // if (comparePassword) {
        //     const token = jwt.sign(
        //         {
        //             email: checkEmail.email,
        //             userId: checkEmail._id.toString()
        //         },
        //         'somesupersecretsecret',
        //         {expiresIn: '1h' }
        //     )

        //     res.status(200).json({message: "User login successfuly!", token: token})
        // }
    // } catch (err) {
    //     throw new Error(err)
    // }
})

module.exports = { signUp, login }