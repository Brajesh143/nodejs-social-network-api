const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const tokenValidate = require('../middlewares/validator')

router.get('/', postController.getPosts)

router.post('/', tokenValidate, postController.createPost)

router.get('/:id', postController.getPostDetails)

router.put('/:id', tokenValidate, tokenValidate, postController.updatePost)

router.delete('/:id', tokenValidate, postController.deletePost)

router.get('/my-post', tokenValidate, postController.getMyPost)

module.exports = router;