const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1, id: 1 })
  res.json(blogs)
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
  const { title, author, url, likes, user } = request.body

  if (!title || !url) {
    return response.status(400).json({ error: 'Title and URL must be provided' })
  }

  const userExists = await User.findById(user)
  console.log(userExists.id)

  const blog = new Blog({
      title: title,
      author: author,
      url: url,
      likes: likes !== undefined ? likes : 0,
      user: userExists.id
  })

  try {
    const savedBlog = await blog.save()
    userExists.blogs = userExists.blogs.concat(savedBlog._id)
    await userExists.save()

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
