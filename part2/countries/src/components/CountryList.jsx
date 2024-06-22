import React from 'react'
import SelectedCountry from './SelectedCountry'
const CountryList = ( {filteredCountries, handleSelectedCountry, selectedCountry } ) => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>
    
    } else if ( (filteredCountries.length > 2 && filteredCountries.length < 10) || filteredCountries.length === 0) {
      return (
        <div>
          {filteredCountries.map(country => <p key={country.name.common}>{country.name.common}
            <button onClick={() => handleSelectedCountry(country)}>Show</button>
  
          </p>)}
        </div>
      )
    } else if (filteredCountries.length === 1) {
        return <SelectedCountry selectedCountry={filteredCountries[0]} />
    }
    else {
      return <p>No matches found</p>
  }
}

export default CountryList