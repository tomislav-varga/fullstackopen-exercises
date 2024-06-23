import React from 'react'

const SelectedCountry = ( {selectedCountry} ) => {
    if (selectedCountry) {
      return (
        <div>
          <h2>{selectedCountry.name.common}</h2>
          <p>Capital: {selectedCountry.capital}</p>
          <p>Population: {selectedCountry.population}</p>
          <h3>Languages</h3>
          <ul>
            {Object.values(selectedCountry.languages).map((language, index) => <li key={index}>{language}</li>)}          
          </ul>
          <p style={{ fontSize: '100px' }}>{selectedCountry.flag}</p>
        </div>
      )
    } 
    else {
      return <p>No matches found</p>
  }
}

export default SelectedCountry