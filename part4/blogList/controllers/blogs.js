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

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL must be provided' })
  }

  const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes !== undefined ? likes : 0,
  })

  try {
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  } catch (error) {
    response.status(400).json({ error: error.message })
  }
})

module.exports = blogRouter
