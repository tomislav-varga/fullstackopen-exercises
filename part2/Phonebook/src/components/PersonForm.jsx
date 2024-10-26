/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'

const PersonForm = ({ newName, newNumber, addNameAndNumber, handleNameChange, handleNumberChange }) => {
    return (
        <form id="form-1" onSubmit={addNameAndNumber}>
            <div>
                name: <input id="input-name" value={newName}
                    onChange={handleNameChange} />
            </div>
            <div>
                number: <input id="input-number" value={newNumber}
                    onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}
PersonForm.propTypes = {
    newName: PropTypes.string.isRequired,
    newNumber: PropTypes.string.isRequired,
    addNameAndNumber: PropTypes.func.isRequired,
    handleNameChange: PropTypes.func.isRequired,
    handleNumberChange: PropTypes.func.isRequired,
}

export default PersonForm