/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const ErrorNotification = ({ message }) => {

    if (!message) {
        console.log('message is null')
        return null
    }
    return (
        <div className="error-notification">
            {message}
        </div>
    )
}
ErrorNotification.propTypes = {
    message: PropTypes.string
}

export default ErrorNotification