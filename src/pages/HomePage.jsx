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

  // Helper: puts names starting with Å/å at the end
  const sortKey = (name) =>
    /^[Åå]/.test(name) ? 'zzzz' + name.toLowerCase() : name.toLowerCase();

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const res = await fetch('https://restcountries.com/v3.1/all');
        const data = await res.json();
        // initial sort with Å last
        const sorted = data.sort((a, b) =>
          sortKey(a.name.common).localeCompare(sortKey(b.name.common))
        );
        setCountries(sorted);
        setFilteredCountries(sorted);
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
      temp = temp.filter((c) =>
        c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (region) {
      temp = temp.filter((c) => c.region === region);
    }
    // reapply custom sort after filtering
    const resorted = [...temp].sort((a, b) =>
      sortKey(a.name.common).localeCompare(sortKey(b.name.common))
    );
    setFilteredCountries(resorted);
  }, [searchTerm, region, countries]);

  return (
    <div className="page-container">
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
    </div>
  );
}


export default HomePage;