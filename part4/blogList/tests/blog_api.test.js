const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('../utils/test_helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.blogsListAll)
})

test('GET /api/blogs returns all blogs', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)

    assert.equal(response.body.length, helper.blogsListAll.length)
})

test('GET blogs have identifier field id', async () => {
    const response = await api
      .get('/api/blogs')

    response.body.forEach(blog => {
    assert.ok(blog.hasOwnProperty('id'), 'Blog does not have an id field')
    assert.equal(typeof blog.id, 'string', 'id field is not a string')
  })
})

test('POST /api/blogs adds a new blog', async () => {
    const listWithOneBlog = {
            _id: '5a422aa71b54a676234d17f8',
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
            likes: 5,
            __v: 0
          }

    await api
        .post('/api/blogs')
        .send(listWithOneBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.blogsListAll.length + 1)
})

test('POST /api/blogs defaults to 0 if likes property is missing', async () => {
    await api
      .post('/api/blogs')
      .send({ title: 'Test title', author: 'Test author', url: 'testurl.com' })
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const addedBlog = blogs[blogs.length - 1]
  
    assert.strictEqual(addedBlog.likes, 0)
  })

test('POST /api/blogs responds with 400 if title or url is missing', async () => {
    const response = await api
        .post('/api/blogs')
        .send({ author: 'Test author', likes: 10 })
        .expect(400)
        .expect('Content-Type', /application\/json/)
    
    assert.ok(response.body.error)
})


after(async () => {
    await mongoose.connection.close()
})