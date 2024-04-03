const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: "Name field is required"
    },
    email: {
        type: String,
        required: "Email field is required",
        unique: true
    },
    password: {
        type: String,
        required: "Password must be atleast 8 chars or atmost 16 chars",
        minlength: 8
    },
    role: {
        type: String,
        required: true,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    post: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Post'
        }
    ]
}, {
    timestamps: true
})

module.exports = mongoose.model('User', userSchema)