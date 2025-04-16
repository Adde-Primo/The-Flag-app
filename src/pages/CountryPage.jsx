import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Grid, Box, Typography, IconButton, Button } from '@mui/material';
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
    return (
      <Typography variant="h5" textAlign="center" mt={4}>
        Loading...
      </Typography>
    );
  }

  if (!country) {
    return (
      <Typography variant="h5" textAlign="center" mt={4}>
        Country not found...
      </Typography>
    );
  }

  const arrowIcon = theme === 'dark' ? ArrowLeft : ArrowLeftDark;

  return (
    <Box sx={{ width: '100%', margin: '0 auto', padding: 0 }}>
      <Grid container direction="column" spacing={9} sx={{ padding: 1 }}>
        {/* Back Button */}
        <Grid>
          <Box display="flex" alignItems="center">
            <IconButton onClick={() => navigate(-1)}>
              <img
                src={arrowIcon}
                alt="Back arrow"
                style={{
                  width: '18px',
                  height: 'auto',
                  filter: theme === 'dark' ? 'brightness(0) invert(1)' : 'none'
                }}
              />
            </IconButton>
            <Typography variant="body1" ml={1}>
              BACK
            </Typography>
          </Box>
        </Grid>

        {/* Contenido: Bandera e Información */}
        <Grid container spacing={8}>
          {/* Columna para la bandera */}
          <Grid sx={{ width: { xs: '100%', md: '40%' } }}>
            <Box display="flex" justifyContent="center">
              <img
                src={country.flags.png}
                alt={`${country.name.common} flag`}
                style={{
                  width: '100%',
                  height: 'auto'
                }}
              />
            </Box>
          </Grid>

          {/* Columna para la información */}
          <Grid sx={{ width: { xs: '100%', md: '50%' } }}>
            <Typography variant="h3" gutterBottom>
              {country.name.common}
            </Typography>
            <Typography variant="body1">
              <strong>Population:</strong> {country.population.toLocaleString()}
            </Typography>
            <Typography variant="body1">
              <strong>Region:</strong> {country.region}
            </Typography>
            <Typography variant="body1">
              <strong>Sub Region:</strong> {country.subregion || 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Capital:</strong>{' '}
              {country.capital ? country.capital[0] : 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Top Level Domain:</strong>{' '}
              {country.tld ? country.tld.join(', ') : 'N/A'}
            </Typography>
            <Typography variant="body1">
              <strong>Currencies:</strong>{' '}
              {country.currencies
                ? Object.values(country.currencies).map((c) => c.name).join(', ')
                : 'N/A'}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Languages:</strong>{' '}
              {country.languages
                ? Object.values(country.languages).join(', ')
                : 'N/A'}
            </Typography>

            {neighbors.length > 0 && (
              <Box mt={2}>
                <Typography variant="h6">Border Countries:</Typography>
                <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                  {neighbors.map((neighbor) => (
                    <Button
                      key={neighbor.cca3}
                      variant="outlined"
                      component={Link}
                      to={`/country/${neighbor.name.common}`}
                    >
                      {neighbor.cca3}
                    </Button>
                  ))}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CountryPage;

