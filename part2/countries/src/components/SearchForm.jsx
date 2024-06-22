import React from 'react'

const SearchForm = ({ searchQuery, handleSearchQuery }) => {
    return (
        <div>
            <h1>Countries</h1>
            <form>
                find countries <input value={searchQuery} onChange={handleSearchQuery} />
            </form>
        </div>
    )
}

export default SearchForm