const asyncHandler = require('async-handler-express')
const bcrypt = require('bcryptjs')
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

const signUp = asyncHandler(async (req, res) => {
    const {name, email, password, role} = req.body;
    const hashedPassword = await bcrypt.hash(password, 12);
    res.json({ hashedPassword });
    // console.log(hashedPassword);
    // exit;
});

// asyncHandler(async (req, res) => {
//     // Asynchronous operation
//     const result = await someAsyncOperation();
//     res.json({ result });
//   })

const login = (req, res, next) => {

}

module.exports = { signUp, login }