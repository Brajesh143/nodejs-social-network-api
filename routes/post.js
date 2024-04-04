const express = require('express')
const router = express.Router()
const { body } = require('express-validator')
const postController = require('../controllers/post')
const tokenValidate = require('../middlewares/validator')
const inputValidation = require('../middlewares/inputValidator')

router.get('/', postController.getPosts)

router.post('/', 
    body("title")
    .notEmpty()
    .isLength({ min:3, max: 50 })
    .withMessage("Title field must be atleast 3 chars or atmost 50 chars")
    .escape(),
    tokenValidate, postController.createPost)

router.get('/post-details/:id', postController.getPostDetails)

router.put('/:id', tokenValidate, tokenValidate, postController.updatePost)

router.delete('/:id', tokenValidate, postController.deletePost)

router.get('/my-post', tokenValidate, postController.getMyPost)

router.post('/like-unlike/:id', tokenValidate, postController.likeUnlike)

router.patch('/status-update/:id', 
    body("status")
    .isEmpty()
    .withMessage("Status field is required"),
    tokenValidate, postController.statusUpdate)

router.post('/comment/:id', 
    body("comment")
    .isEmpty()
    .withMessage("Comment field is required"),
    tokenValidate, postController.addComment)

router.post('/view/:id', tokenValidate, postController.addView)

module.exports = router;