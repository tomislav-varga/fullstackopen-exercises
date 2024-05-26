import React from 'react'
import Person from './Person'

const Persons = ({ persons, searchQuery, deletePerson }) => {
    return (
        <ul>
        {persons.filter(person => person.name.toLowerCase().includes(searchQuery.toLowerCase())
        ).map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)}
        </ul>
    )
}

export default Persons