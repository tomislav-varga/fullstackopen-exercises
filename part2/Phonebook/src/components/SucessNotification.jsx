/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const SuccessNotification = ({ message }) => {

    if (!message) {
        console.log('message is null')
        return null
    }
    return (
        <div className="success-notification">
            {message}
        </div>
    )
}
SuccessNotification.propTypes = {
    message: PropTypes.string
}

export default SuccessNotification