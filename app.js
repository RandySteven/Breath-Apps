const { urlencoded } = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const path = require('path')

const PostRouter = require('./src/routes/post.route')

require('dotenv').config()

const PORT = process.env.PORT
const MONGOURL = process.env.MONGOURL

app.use(urlencoded({extended:true}))

app.use('/v1/posts', PostRouter.router)
app.use('/public/images', express.static(path.join(__dirname, 'public/images')))

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    next()
})

app.get('/', (req, res) => {
    res.send({message:'Hello'})
})

mongoose.connect(MONGOURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`listen to http://localhost:${PORT}`)
        })
    })
    .catch(err => {
        console.log(err)
    })