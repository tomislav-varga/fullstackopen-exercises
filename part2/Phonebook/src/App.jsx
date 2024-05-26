import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearch] = useState('')

  useEffect(() => { 
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (!nameExists) {
      personService
        .create({ name: newName, number: newNumber })
          .then(returnedPerson => {
            console.log(returnedPerson)
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
    } else {
      alert(`${newName} is already added to phonebook`)
    }
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
       .deletePerson(id)
       .then(() => {
          setPersons(persons.filter(person => person.id!== id))
        })
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
      <Persons persons={persons} searchQuery={searchQuery} deletePerson={deletePerson} />
      
    </div>
  )
}

export default App