import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './CountryPage.css';
import ArrowLeftDark from '../assets/arrow-left-dark.svg';
import ArrowLeft from '../assets/arrow-left.svg';

function CountryPage({ theme }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const data = await res.json();
        const countryData = data[0];
        setCountry(countryData);

        if (countryData.borders) {
          const codes = countryData.borders.join(',');
          const resNeighbors = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`
          );
          const neighborsData = await resNeighbors.json();
          setNeighbors(neighborsData);
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
      }
      setLoading(false);
    };

    fetchCountry();
  }, [name]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!country) {
    return <div className="no-country">Country not found...</div>;
  }

  return (
    <div className="country-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        <span className="back-icon-container">
          <img
            src={theme === 'dark' ? ArrowLeft : ArrowLeftDark}
            alt="Back arrow"
            className="back-arrow"
          />
        </span>
        <span className="back-text">BACK</span>
      </button>

      <div className="details-container">
        <img
          src={country.flags.png}
          alt={`${country.name.common} flag`}
          className="details-flag"
        />
        <div className="details-info">
          <h2>{country.name.common}</h2>
          <div className="info-columns">
            <div>
              <p>
                <strong>Native Name:</strong>{' '}
                {country.name.nativeName
                  ? Object.values(country.name.nativeName)[0].common
                  : 'N/A'}
              </p>
              <p>
                <strong>Population:</strong>{' '}
                {country.population.toLocaleString()}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Sub Region:</strong> {country.subregion || 'N/A'}
              </p>
              <p>
                <strong>Capital:</strong>{' '}
                {country.capital ? country.capital[0] : 'N/A'}
              </p>
            </div>
            <div>
              <p>
                <strong>Top Level Domain:</strong>{' '}
                {country.tld ? country.tld.join(', ') : 'N/A'}
              </p>
              <p>
                <strong>Currencies:</strong>{' '}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(', ')
                  : 'N/A'}
              </p>
              <p>
                <strong>Languages:</strong>{' '}
                {country.languages
                  ? Object.values(country.languages).join(', ')
                  : 'N/A'}
              </p>
            </div>
          </div>
          {neighbors.length > 0 && (
            <div className="neighbors">
              <h3>Border Countries:</h3>
              <div className="neighbors-list">
                {neighbors.map((neighbor) => (
                  <Link
                    key={neighbor.cca3}
                    to={`/country/${neighbor.name.common}`}
                    className="neighbor-button"
                  >
                    {neighbor.name.common}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryPage;
