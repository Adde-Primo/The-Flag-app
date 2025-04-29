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
        const res = await fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`);
        const [countryData] = await res.json();
        setCountry(countryData);

        if (countryData.borders) {
          const resNeighbors = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(',')}`
          );
          setNeighbors(await resNeighbors.json());
        }
      } catch (error) {
        console.error('Error fetching country details:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [name]);

  if (loading) return <Typography variant="h5" textAlign="center" mt={4}>Loading...</Typography>;
  if (!country) return <Typography variant="h5" textAlign="center" mt={4}>Country not found...</Typography>;

  const buttonStyles = {
    dark: {
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      color: '#fff',
      '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.3)' }
    },
    light: {
      backgroundColor: 'rgba(0, 0, 0, 0.08)',
      color: 'rgba(0, 0, 0, 0.87)',
      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.12)' }
    }
  };

  const commonButtonProps = {
    alignItems: 'center',
    borderRadius: '16px',
    cursor: 'pointer',
    display: 'flex',
    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
    fontSize: '13px',
    height: '32px',
    justifyContent: 'center',
    margin: 0,
    minWidth: 'auto',
    padding: '0 16px',
    textDecoration: 'none',
    transition: 'background-color 0.3s ease'
  };

  return (
    <Box sx={{
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      padding: '2rem 0'
    }}>
      <Box sx={{
        width: '80%',
        maxWidth: '1440px',
        margin: '0 auto'
      }}>
        <Grid container direction="column" spacing={9}>
          <Grid item>
            <Box display="flex" alignItems="center">
              <IconButton 
                onClick={() => navigate(-1)}
                sx={{ color: theme === 'dark' ? '#fff' : 'inherit', '&:hover': { backgroundColor: 'transparent' } }}
              >
                <img 
                  src={theme === 'dark' ? ArrowLeft : ArrowLeftDark} 
                  alt="Back arrow" 
                  style={{ width: '18px', height: 'auto' }} 
                />
              </IconButton>
              <Typography variant="body1" ml={1}>BACK</Typography>
            </Box>
          </Grid>

          <Grid container spacing={8}>
            <Grid item xs={12} md={6}>
              <Box display="flex" justifyContent="center">
                <img  
                  src={`https://flagcdn.com/${country.cca2.toLowerCase()}.svg`}
                  alt={`Flag of ${country.name.common}`}
                  style={{
                    width: "100%",
                    maxWidth: "600px",
                    height: "auto",
                    borderRadius: "8px",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
                  }}
                />
              </Box>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h3" gutterBottom>{country.name.common}</Typography>

              <Typography variant="body1"><strong>Population:</strong> {country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}</Typography>
              <Typography variant="body1"><strong>Region:</strong> {country.region}</Typography>
              <Typography variant="body1"><strong>Capital:</strong> {country.capital?.[0] || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Native Name:</strong> {Object.values(country.name.nativeName || {})[0]?.common || country.name.common}</Typography>
              <Typography variant="body1"><strong>Top Level Domain:</strong> {country.tld?.join(', ') || 'N/A'}</Typography>
              <Typography variant="body1"><strong>Currencies:</strong> {country.currencies ? Object.values(country.currencies).map(c => c.name).join(', ') : 'N/A'}</Typography>
              <Typography variant="body1" gutterBottom><strong>Languages:</strong> {country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</Typography>

              {neighbors.length > 0 && (
                <Box mt={2}>
                  <Typography variant="h6">Border Countries:</Typography>
                  <Box display="flex" flexWrap="wrap" gap={1} mt={1}>
                    {neighbors.map(neighbor => (
                      <Button 
                        key={neighbor.cca3}
                        component={Link}
                        to={`/country/${neighbor.name.common}`}
                        sx={{ ...commonButtonProps, ...buttonStyles[theme === 'dark' ? 'dark' : 'light'] }}
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
    </Box>
  );
}

export default CountryPage;