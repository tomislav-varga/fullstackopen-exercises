import React, { useState } from 'react';

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false)

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

  return (
    <div style={blogStyle}>
      <p>{blog.title} by {blog.author}
        <button onClick={toggleDetails}> {showDetails ? 'Hide' : 'View'}</button>
      </p>
      
      {showDetails && (
        <div>
          <p>{blog.url}</p>
          <p>Likes: {blog.likes} 
            <button onClick=""> Like</button>
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog