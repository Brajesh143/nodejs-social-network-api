const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: "Title field is required"
    },
    content: {
        type: String,
        required: "Content field is required"
    },
    image_url: {
        type: String,
        required: "Image field is required"
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
        required: "Creator is required"
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
