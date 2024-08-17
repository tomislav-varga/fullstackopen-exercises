import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders blog title and author', () => {
    const blog = {
        title: 'Test Blog Title',
        author: 'Test Blog Author',
        url: 'testblogurl.com',
        likes: 10,
        user: {
            name: 'Test User',
            id: 'testuser'
        }
    }

    const user = {
        id: 'testuser'
    }
    console.log(blog)

    const { container } = render(<Blog blog={blog} user={user}/>)

    screen.debug(container)

    console.log(container)

    const p = container.querySelector('.blog-header')
    expect(p).toHaveTextContent(
        'Test Blog Title by Test Blog Author'
    )
})