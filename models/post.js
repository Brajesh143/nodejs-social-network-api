const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ['Active', 'Inactive'],
        default: 'Active'
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comment: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ],
    like: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Like'
        }
    ]
},{ timestamps: true }
);

module.exports = mongoose.model('Post', postSchema)
