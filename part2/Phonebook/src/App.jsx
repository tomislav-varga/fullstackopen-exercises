import { useState } from 'react'


const App = () => {
  const personsArray = [
    { name: 'Arto Hellas' }
  ]
  
  const [persons, setPersons] = useState(personsArray)
  const [newName, setNewName] = useState('')

  // This is the function that is executed when the form is submitted.
  const addName = (event) => {
    event.preventDefault() // Prevents the default behavior of the form, to reload the 
                           // page.
    setPersons(persons.concat({ name: newName })) // Adds the new person to the persons array.
    setNewName('') // Sets the new name to an empty string.
  }

  // This is the function that is executed when the user types in the input field.
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* This is the container for the form. The onSubmit attribute is an event handler 
      that specifies a function (addName) to execute when the form is submitted */}
      <form onSubmit={addName}>
        <div>
          {/* This input field is for the user to enter a new name. The value attribute 
          is bound to the newName state, meaning the input field displays the value of 
          newName. The onChange attribute is an event handler that updates the newName 
          state with the input's current value whenever the user types in the field, 
          using the handleNameChange function. */}
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App