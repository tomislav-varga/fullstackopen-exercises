import { useState, useEffect } from 'react'
import axios from 'axios'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const App =  () => {

  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => { 
    axios
     .get(url)
     .then(response => {
        setCountries(response.data)     
      })
     .catch(error => {
        console.log(error)
      })
  }, [])

  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.common.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const View = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    
    } else if ( (filteredCountries.length > 2 && filteredCountries.length < 10) || filteredCountries.length === 0) {
      return (
        <div>
          {filteredCountries.map(country => <p key={country.name.common}>{country.name.common}</p>)}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      return (
        <div>
          <h2>{filteredCountries[0].name.common}</h2>
          <p>Capital: {filteredCountries[0].capital}</p>
          <p>Population: {filteredCountries[0].population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(filteredCountries[0].languages).map((language, index) => <li key={index}>{language}</li>)}          
          </ul>
          <p style={{ fontSize: '100px' }}>{filteredCountries[0].flag}</p>
        </div>
      )
    } 
    else {
      return <p>No matches found</p>
  }
}

  return (
    <div>
      <h1>Countries</h1>
      <form>
        find countries <input value={searchQuery} onChange={handleSearchQuery} />
      </form>
      <View />
    </div>
  )
}
export default App
