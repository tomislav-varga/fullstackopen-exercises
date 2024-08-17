import PropTypes from 'prop-types'
import ErrorNotification from './ErrorNotifcation'

const LoginForm = ({ 
  handleSubmit, 
  handleUsernameChange, 
  handlePasswordChange, 
  username, 
  password, 
  errorMessage 
}) => {
    
  return (
    <>
      <h2>log in to application</h2>
      <ErrorNotification message={errorMessage} />
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({target }) => handleUsernameChange(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({target }) => handlePasswordChange(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  errorMessage: PropTypes.string
}

export default LoginForm