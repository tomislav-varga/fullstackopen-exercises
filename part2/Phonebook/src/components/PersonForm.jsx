import React from 'react'

const PersonForm = (props) => {
    return (
        <form id="form-1" onSubmit={props.addNameAndNumber}>
            <div>
                name: <input id="input-name" value={props.newName} 
                      onChange={props.handleNameChange}/>
            </div>
            <div>
                number: <input id="input-number" value={props.newNumber} 
                        onChange={props.handleNumberChange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm