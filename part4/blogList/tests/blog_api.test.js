const { test, describe, after, beforeEach } = require('node:test')
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

test('blogs have identifier field id', async () => {
    const response = await api
      .get('/api/blogs')

    response.body.forEach(blog => {
    assert.ok(blog.hasOwnProperty('id'), 'Blog does not have an id field')
    assert.equal(typeof blog.id, 'string', 'id field is not a string')
  })
})

test('POST /api/blogs adds a new blog', async () => {

    await api
        .post('/api/blogs')
        .send(helper.listWithOneBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.blogsListAll.length + 1)

})


after(async () => {
    await mongoose.connection.close()
})