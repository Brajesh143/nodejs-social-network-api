const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: "Post field is required"
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: "User field is required"
    }
}, { timestamps: true })

module.exports = mongoose.model('Like', likeSchema)