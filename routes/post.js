const express = require('express')
const router = express.Router()
const postController = require('../controllers/post')
const tokenValidate = require('../middlewares/validator')

router.get('/', postController.getPosts)

router.post('/', tokenValidate, postController.createPost)

router.get('/post-details/:id', postController.getPostDetails)

router.put('/:id', tokenValidate, tokenValidate, postController.updatePost)

router.delete('/:id', tokenValidate, postController.deletePost)

router.get('/my-post', tokenValidate, postController.getMyPost)

router.post('/like-unlike/:id', tokenValidate, postController.likeUnlike)

router.patch('/status-update/:id', tokenValidate, postController.statusUpdate)

router.post('/comment/:id', tokenValidate, postController.addComment)

router.post('/view/:id', tokenValidate, postController.addView)

module.exports = router;