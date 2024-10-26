/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const Filter = ({ searchQuery, handleSearchChange }) => {
    return (
        <div>
        filter shown with: 
        <input id="input-search" placeholder="search for name" 
        value={searchQuery} onChange={handleSearchChange} />
      </div>
    )
}
Filter.propTypes = {
    searchQuery: PropTypes.string.isRequired,
    handleSearchChange: PropTypes.func.isRequired,
}

export default Filter