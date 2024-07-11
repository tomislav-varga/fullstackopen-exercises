const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogRouter.get('/:id',(req, res, next) => {
    Blog.findById(req.params.id)
      .then(blog => {
        if (blog) {
          res.json(blog)
        } else {
          res.status(404).end()
        }
      })
      .catch(err => next(err))
})

blogRouter.post('/', (req, res, next) => {
    const { title, author, url, likes } = req.body
    const blog = new Blog({
        title: title,
        author: author,
        url: url,
        likes: likes,
    })
    blog.save()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => next(err))
})

module.exports = blogRouter
