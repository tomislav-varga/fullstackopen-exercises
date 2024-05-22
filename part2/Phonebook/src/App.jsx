import { useState } from 'react'

const App = () => {
  const personsArray = [
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]
  
  const [persons, setPersons] = useState(personsArray)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchQuery, setNewSearch] = useState('')

  const addNameAndNumber = (event) => {
    event.preventDefault()
    const nameExists = persons.some(person => person.name === newName)
    if (!nameExists) {
      setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }))
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

  const handleSearchChange = (event) => {
    console.log(event.target.value)
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div className="">
        filter shown with: 
        <input id="input-search" placeholder="search for name" 
        value={searchQuery} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
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
        {/* persons.filter(...): This method is called on the persons array. 
        The filter method creates a new array with all elements that pass the 
        test implemented by the provided function */}
      {persons.filter(person => {
        /* This is the function provided to filter. For each person object in the 
        persons array, it converts both the person's name and the search query to 
        lowercase (to make the search case-insensitive) and then checks if the 
        person's name includes the search query string. 
        The includes method is used to determine whether the person's name contains 
        the search query substring. It returns true if the substring is found 
        anywhere within the given string; otherwise, it returns false.*/
        return person.name.toLowerCase().includes(searchQuery.toLowerCase())
      }
      /*The result of the filter method is an array of person objects whose names 
      match the search query. This filtered array is then mapped to <li> elements that
      are displayed in the <ul> list.  */
      ).map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App