import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import ErrorNotification from './components/ErrorNotifcation'
import SuccessNotification from './components/SuccessNotification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {

  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({ title: '', author: '', url: '' })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)
  
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('Error logging in:', exception.message)
      setErrorMessage('Username or password is incorrect')
      setTimeout(() => {
        setErrorMessage(null)
      }, 4000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }
    blogService
     .create(newBlog)
     .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewBlog('')
        setSuccessMessage(`A new blog '${newBlog.title}' by author ${newBlog.author} added`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 4000)
      })
     .catch(error => {
        console.log('Error creating blog:', error.message)
        setErrorMessage('Failed to create blog', error.message)
        setTimeout(() => {
          setErrorMessage(null)
        }, 4000)
      })
  }

  const loginForm = () => (      
    <>
      <h2>log in to application</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const loggedInView = () => (
    <div>
      <h2>blogs</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={successMessage} />
      <p>{user.name} logged in
        <button onClick={handleLogout}>logout</button>
      </p>
      <form onSubmit={addBlog}>
      <h2>create new blog</h2>
        <div>
          title
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={({ target }) => setNewBlog({...newBlog, title: target.value })}
          />
        </div>
        <div>
          author
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={({ target }) => setNewBlog({...newBlog, author: target.value })}
          />
        </div>
        <div>
          url
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={({ target }) => setNewBlog({...newBlog, url: target.value })}
          />
        </div>
        <button type="submit">create</button>
      </form>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
       
    </div>
  )

  return (
    <div>
      {!user && loginForm()}
      {user && loggedInView()}
    </div>
  )
   
}

export default App