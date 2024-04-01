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
    
        const user = await User.findOneAndUpdate({_id: user_id}, { $push: {post: post }})
    
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
        const post = await Post.findOne({ _id : post_id })

        res.status(200).json({ message: "Post data found", data: post })

    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const updatePost = asyncHandler(async (req, res, next) => {
    const post_id = req.params.id;

    const { title, content, image_url, status } = req.body
    const user_id = req.userId;
    try {
        const post = await Post.findById(post_id)

        if (post.creator.toString() === user_id) {
            // await Post.findOneAndUpdate({_id: post_id}, { })
            post.title = title
            post.content = content
            post.image_url = image_url
            post.status = status

            await post.save()

            res.status(200).json({ message: "Post updated successfuly" })
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

const deletePost = asyncHandler(async (req, res, next) => {
    const post_id = req.params.id;
    const user_id = req.userId;

    try {
        const post = await Post.findById(post_id)
        if (post.creator.toString() === user_id) {
            await User.findOneAndUpdate({_id: user_id}, { $pull: { post : post_id }})
            await Post.deleteOne({ _id: post_id });

            res.status(200).json({ message: "Post deleted successfuly" })
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

const getMyPost = asyncHandler(async (req, res, next) => {
    const user_id = req.userId

    try {
        const posts = await Post.find({ creator : user_id })
        
        res.status(200).json({ message: "Post data", data: posts })
    } catch (err) {
        res.status(500).json({
            message: "An error occurred",
            error: err.message
        })
    }
})

const likeUnlike = asyncHandler(async (req, res, next) => {

})

const statusUpdate = asyncHandler(async (req, res, next) => {

})

const addComment = asyncHandler(async (req, res, next) => {

})

const addView = asyncHandler(async (req, res, next) => {

})

module.exports = { getPosts, createPost, getPostDetails, updatePost, deletePost, getMyPost, likeUnlike, statusUpdate, addComment, addView }