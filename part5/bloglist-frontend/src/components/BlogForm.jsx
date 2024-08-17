import { useState } from 'react'

const BlogForm = ({ createBlog, user }) => {
    const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
          title: newBlog.title,
          author: newBlog.author,
          url: newBlog.url,
/*           likes: 0,
          user: user.id, */
        })
    }

    return (
        <form onSubmit={addBlog}>
            <h2>create new blog</h2>
            <div>
                <label for="title">title</label>
                <input
                    type="text"
                    value={newBlog.title}
                    name="title"
                    id="title"
                    onChange={({ target }) => setNewBlog({...newBlog, title: target.value })}
                />
            </div>
            <div>
                <label for="author">author</label>
                <input
                    type="text"
                    value={newBlog.author}
                    name="author"
                    id="author"
                    onChange={({ target }) => setNewBlog({...newBlog, author: target.value })}
                />
            </div>
            <div>
                <label for="url">url</label>
                <input
                    type="text"
                    value={newBlog.url}
                    name="url"
                    id="url"
                    onChange={({ target }) => setNewBlog({...newBlog, url: target.value })}
                />
            </div>
            <button type="submit" className="button">create</button>
        </form>
    )
}

export default BlogForm