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
  
  console.log(countries)
  const handleSearchQuery = (event) => {
    setSearchQuery(event.target.value)
    setFilteredCountries(countries.filter(country => country.name.toLowerCase().includes(event.target.value.toLowerCase())))
  }

  const Content = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    
    } else if ( (countries.length > 2 && countries.length < 10) || filteredCountries.length === 0) {
      return (
        <div>
          {filteredCountries.map(country => <p key={country.name}>{country.name} <button onClick={() => setSelectedCountry(country)}>show</button></p>)}
        </div>
      )
    } else if (filteredCountries.length === 1) {
      return null
    } else {
      return null
    }
  }

  return (
    <div>
      <h1>Countries</h1>
      <form>
        find countries <input value={searchQuery} onChange={handleSearchQuery} />
      </form>
      <Content />
    </div>
  )
}
export default App
