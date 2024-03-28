const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')

router.get('/', postController.getPosts)

router.post('/', postController.createPost)

router.get('/:id', postController.getPostDetails)

router.put('/:id', postController.updatePost)

router.delete('/:id', postController.deletePost)

router.get('/my-post', postController.getMyPost)

module.exports = router;