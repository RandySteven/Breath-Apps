const Post = require('../models/post.model')

const addPost = async (req, res) => {
    let {title, body} = req.body
    let image = await req.file

    if(image === undefined){
        res.send({message:'Please send message'})
    }else{
        image = image.path
    }

    let post = new Post({
        title: title,
        body: body,
        image: image
    })
    post = await post.save()
    res.status(201).send({message:'Success create post', post:post})
}

const getAllPosts = async (req, res) => {
    let posts = await Post.aggregate([
        {"$project":{
            "title": "$title",
            "body": "$body",
            "image": "$image",
            "url": [
                {"$concat":["https://breath-info-api.herokuapp.com/v1/posts/", {
                    "$convert":{
                        "input": "$_id",
                        "to": "string"
                    }
                }]}
            ]
        }}
    ])

    if(posts.length > 0){
        res.status(200).send({message:'Get all posts data', posts:posts})
    }else{
        res.status(200).send({message:'There is no post data'})
    }
}

const getPostById = async(req, res) => {
    let postId = req.params.postId
    let post = await Post.findById(postId).lean()
    res.status(200).send({message:'Get data', post:post})
}

module.exports = {
    addPost,
    getAllPosts,
    getPostById
}