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

after(async () => {
    await mongoose.connection.close()
})