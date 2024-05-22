import React from 'react'

const Filter = (props) => {
    return (
        <div>
        filter shown with: 
        <input id="input-search" placeholder="search for name" 
        value={props.searchQuery} onChange={props.handleSearchChange} />
      </div>
    )
}

export default Filter