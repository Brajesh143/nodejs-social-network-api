const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "User field is required"
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: "Post field is required"
    },
    comment: {
        type: String,
        required: "Comment field is required"
    }
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)