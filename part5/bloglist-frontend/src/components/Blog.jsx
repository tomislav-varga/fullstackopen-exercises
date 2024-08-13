import React, { useState } from 'react';

const Blog = ({ blog, updateBlog }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  }

  const handleLike = (event) => {
    event.preventDefault()
    const updatedBlog = {...blog, likes: setLikes(likes + 1)}
    updateBlog(updatedBlog)
  }

  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}
        <button onClick={toggleDetails}> {showDetails ? 'Hide' : 'View'}</button>
      </p>
      
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {likes} 
            <button onClick={handleLike}> Like</button>
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog