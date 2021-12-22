const express = require('express')
const router = express.Router()
const PostController = require('../controllers/post.controller')
const multer = require('multer')

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if(
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
        ){
        cb(null, true)
    }else{
        cb(null, false)
    }
}

const upload = multer({storage:multerStorage, fileFilter:fileFilter})

router.get('/', PostController.getAllPosts)
router.post('/insert-post', upload.single('image'), PostController.addPost)
router.get('/:postId', PostController.getPostById)

module.exports = {router}