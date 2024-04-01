const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    role: {
        type: String,
        require: true,
        enum: ['Admin', 'User'],
        default: 'User'
    },
    status: {
        type: String,
        require: true,
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