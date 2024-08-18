import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('BlogForm calls event handler with correct details when new blog is created', async () => {
    const createBlog = { current: null }
    const onCreateBlog = (blogObject) => {
        createBlog.current = blogObject
    }

    render(<BlogForm createBlog={onCreateBlog} />)

    const titleInput = screen.getByLabelText('title')
    const authorInput = screen.getByLabelText('author')
    const urlInput = screen.getByLabelText('url')
    const submitButton = screen.getByRole('button', { name: /create/i })

    await userEvent.type(titleInput, 'Test Blog Title')
    await userEvent.type(authorInput, 'Test Author')
    await userEvent.type(urlInput, 'http://testblog.com')
    await userEvent.click(submitButton)

    expect(createBlog.current).toEqual({
        title: 'Test Blog Title',
        author: 'Test Author',
        url: 'http://testblog.com'
    })
})