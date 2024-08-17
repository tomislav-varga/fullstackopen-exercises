import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    const { container } = render(<Blog blog={blog} user={user}/>)

    const p = container.querySelector('.blog-header')
    expect(p).toHaveTextContent(
        'Test Blog Title by Test Blog Author'
    )
})

test('blog url and likes are shown when view button is clicked', async () => {
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

    render(<Blog blog={blog} user={user}/>)

    const button = screen.getByText('View')
    await userEvent.click(button)

    expect(screen.getByText('testblogurl.com')).toBeDefined()
    expect(screen.getByText('Likes: 10')).toBeDefined()
})