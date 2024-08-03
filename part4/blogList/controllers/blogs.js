const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (req, res) => {
  Blog.find({}).then(blogs => {
    res.json(blogs)
  })
})

blogRouter.get('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    if (blog) {
      res.json(blog)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
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

blogRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await Blog.findByIdAndDelete(req.params.id)
    if (result) {
      res.status(204).end()
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

blogRouter.put('/:id', async (req, res, next) => {
  const { title, author, url, likes } = req.body

  const updatedBlog = {
    title: title,
    author: author,
    url: url,
    likes: likes!== undefined? likes : 0,
  }

  try {
    const updatedResult = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, { new: true })
    if (updatedResult) {
      res.json(updatedResult)
    } else {
      res.status(404).end()
    }
  } catch (error) {
    next(error)
  }
})

module.exports = blogRouter
