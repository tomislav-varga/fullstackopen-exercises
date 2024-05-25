import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearch] = useState('')

  const getAll = () => {
    axios
     .get('http://localhost:3001/persons')
     .then(response => {
        console.log(response.data)
        setPersons(response.data)
      })
  }
  const create = newObject => {
    axios
     .post('http://localhost:3001/persons', newObject)
     .then(response => {
        console.log(response.data)
        setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }))
      })
  }

  useEffect(() => { 
    getAll()
  }, [])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (!nameExists) {
      create({ name: newName, number: newNumber })
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

  const handleSearchQuery = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchQuery={searchQuery} handleSearchChange={handleSearchQuery} />
      <h2>add a new</h2>
      <PersonForm newName={newName} newNumber={newNumber} addNameAndNumber={addNameAndNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} searchQuery={searchQuery} />
    </div>
  )
}

export default App