import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import './DropDown.css';

function DropDown({ region, setRegion }) {
  return (
    <div className="dropdown-wrapper">
      <FormControl variant="outlined" fullWidth className="dropdown-container">
        <InputLabel id="region-label">Region</InputLabel>
        <Select
          labelId="region-label"
          label="Region"
          value={region}
          onChange={(e) => setRegion(e.target.value)}
        >
          <MenuItem value="">
            All
          </MenuItem>
          <MenuItem value="Africa">Africa</MenuItem>
          <MenuItem value="Americas">Americas</MenuItem>
          <MenuItem value="Asia">Asia</MenuItem>
          <MenuItem value="Europe">Europe</MenuItem>
          <MenuItem value="Oceania">Oceania</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default DropDown;


