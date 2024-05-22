import { useState } from 'react'

const App = () => {
  const personsArray = [
    { name: 'Arto Hellas', number: '040-123456' },
  ]
  
  const [persons, setPersons] = useState(personsArray)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (!nameExists) {
      setPersons(persons.concat({ name: newName, number: newNumber }))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form id="form-1" onSubmit={addNameAndNumber}>
        <div>
          name: <input id="input-name" value={newName} 
                onChange={handleNameChange}/>
        </div>
        <div>
          number: <input id="input-number" value={newNumber} 
                  onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App