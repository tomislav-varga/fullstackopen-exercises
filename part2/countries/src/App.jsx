import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchForm from './components/SearchForm'
import CountryList from './components/CountryList'
import SelectedCountry from './components/SelectedCountry'

const url = 'https://studies.cs.helsinki.fi/restcountries/api/all'

const App =  () => {

  const [countries, setCountries] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [selectedCountry, setSelectedCountry] = useState(null)

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

  const handleSelectedCountry = (country) => {
    setSelectedCountry(country)
    console.log(country)
  }

  return (
    <div>
      <SearchForm searchQuery={searchQuery} handleSearchQuery={handleSearchQuery} />
      <CountryList filteredCountries={filteredCountries} handleSelectedCountry={handleSelectedCountry} selectedCountry={selectedCountry}/>
      {selectedCountry && <SelectedCountry selectedCountry={selectedCountry} />}
    </div>
  )
}
export default App
