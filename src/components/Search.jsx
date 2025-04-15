import React from 'react';
import TextField from '@mui/material/TextField';
import './Search.css';

function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <TextField 
        label="Search for a country" 
        variant="outlined" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)} 
        fullWidth
      />
    </div>
  );
}

export default Search;



