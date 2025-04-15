import React from 'react';
import { Link } from 'react-router-dom';
import './CountryCard.css';

function CountryCard({ country }) {
  return (
    <Link to={`/country/${country.name.common}`} className="country-card">
      <img
        src={country.flags.png}
        alt={`${country.name.common} flag`}
        className="country-flag"
      />
      <div className="country-info">
        <h2>{country.name.common}</h2>
        <p>
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        <p>
          <strong>Region:</strong> {country.region}
        </p>
        <p>
          <strong>Capital:</strong>{' '}
          {country.capital ? country.capital[0] : 'N/A'}
        </p>
      </div>
    </Link>
  );
}

export default CountryCard;

