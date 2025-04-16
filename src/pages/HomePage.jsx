import React, { useEffect, useState } from 'react';
import './HomePage.css';
import Search from '../components/Search';
import DropDown from '../components/DropDown';
import CountryCard from '../components/CountryCard';

function HomePage() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [region, setRegion] = useState('');

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();

        
        const sortedData = data.sort((a, b) =>
          a.name.common.localeCompare(b.name.common)
        );

        setCountries(sortedData);
        setFilteredCountries(sortedData);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
      setLoading(false);
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    let temp = countries;

    if (searchTerm) {
      temp = temp.filter((country) =>
        country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (region) {
      temp = temp.filter((country) => country.region === region);
    }

    setFilteredCountries(temp);
  }, [searchTerm, region, countries]);

  return (
    <div className="home-page">
      <div className="filter-bar">
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <DropDown region={region} setRegion={setRegion} />
      </div>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="countries-grid">
          {filteredCountries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
        </div>
      )}
    </div>
  );
}

export default HomePage;