const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Post = require('../models/post')
const User = require('../models/user')

const getPosts = asyncHandler(async (req, res, next) => {
    try {
        const posts = await Post.find({ status : { $ne: 'Inactive' }})
        
        res.status(200).json({ message: "Post data", data: posts })
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const createPost = asyncHandler(async (req, res, next) => {
    const { title, content, image_url, status } = req.body;
    const user_id = req.userId;

    try {
        const post = await Post.create({
            title,
            content,
            image_url,
            status,
            creator: user_id
        })
    
        const user = await User.findById(user_id)
        user.post.push(post)
        user.save()
    
        res.status(201).json({ message: "Post created successfuly", data: post })
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const getPostDetails = asyncHandler(async (req, res, next) => {
    const post_id = req.params.id;
    
    try {
        const post = await Post.findById(post_id)

        res.status(200).json({ message: "Post data found", data: post })

    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const updatePost = asyncHandler(async (req, res, next) => {

})

const deletePost = asyncHandler(async (req, res, next) => {

})

const getMyPost = asyncHandler(async (req, res, next) => {
    const user_id = req.userId
    console.log("hello")
    // const userObjectId = mongoose.Types.ObjectId(user_id);
    // try {
        // const posts = await Post.find({ creator : userObjectId })
        // console.log(posts, userObjectId)
        
        // res.status(200).json({ message: "Post data", data: posts })
    // } catch (err) {
    //     res.status(500).json({
    //         message: "An error occurred",
    //         error: err.message
    //     })
    // }
})

module.exports = { getPosts, createPost, getPostDetails, updatePost, deletePost, getMyPost }