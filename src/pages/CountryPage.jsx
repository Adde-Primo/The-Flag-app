import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Grid, Box, Typography, Button } from "@mui/material";
import ArrowLeftDark from "../assets/arrow-left-dark.svg";
import ArrowLeft from "../assets/arrow-left.svg";

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
        const [countryData] = await res.json();
        setCountry(countryData);
        if (countryData.borders) {
          const resNbr = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${countryData.borders.join(
              ","
            )}`
          );
          setNeighbors(await resNbr.json());
        }
      } catch (error) {
        console.error("Error fetching country details:", error);
      } finally {
        setLoading(false);
      }
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

  const arrowIcon = theme === "dark" ? ArrowLeft : ArrowLeftDark;

  const commonButtonProps = {
    alignItems: "center",
    borderRadius: "16px",
    cursor: "pointer",
    display: "flex",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontSize: "13px",
    height: "30px",
    justifyContent: "center",
    margin: 0,
    minWidth: "auto",
    padding: "0 10px",
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  const buttonStyles = {
    dark: {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
      color: "#fff",
      "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.3)" },
    },
    light: {
      backgroundColor: "rgba(0, 0, 0, 0.08)",
      color: "rgba(0, 0, 0, 0.87)",
      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.12)" },
    },
  };

  return (
    <Box
      sx={{
        width: { xs: "90%", md: "80%" },
        mx: "auto",
        py: "2.5rem",
      }}
    >
      <Grid container direction="column" spacing={14}>
        <Grid item>
          <Button
            onClick={() => navigate(-1)}
            startIcon={
              <img
                src={arrowIcon}
                alt="Back arrow"
                style={{ width: 18, height: "auto" }}
              />
            }
            sx={{
              textTransform: "none",
              color: theme === "dark" ? "#fff" : "inherit",
              backgroundColor: "transparent",
              "&:hover": {
                backgroundColor:
                  theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.04)",
              },
            }}
          >
            BACK
          </Button>
        </Grid>

        <Grid container spacing={10}>
          <Grid item xs={12} md={6}>
            <Box display="flex" justifyContent="center">
              <img
                src={`https://flagcdn.com/${country.cca2
                  .toLowerCase()
                  .trim()}.svg`}
                alt={`Flag of ${country.name.common}`}
                style={{
                  width: "100%",
                  maxWidth: "600px",
                  height: "auto",
                  borderRadius: "8px",
                  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                }}
              />
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h3" gutterBottom>
              {country.name.common}
            </Typography>

            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Population:</strong> {country.population}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Region:</strong> {country.region}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Native Name:</strong>{" "}
              {Object.values(country.name.nativeName || {})[0]?.common ||
                country.name.common}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Top Level Domain:</strong>{" "}
              {country.tld?.join(", ") || "N/A"}
            </Typography>
            <Typography variant="body1" sx={{ mb: 1 }}>
              <strong>Currencies:</strong>{" "}
              {country.currencies
                ? Object.values(country.currencies)
                    .map((c) => c.name)
                    .join(", ")
                : "N/A"}
            </Typography>
            <Typography variant="body1" gutterBottom>
              <strong>Languages:</strong>{" "}
              {country.languages
                ? Object.values(country.languages).join(", ")
                : "N/A"}
            </Typography>

            {neighbors.length > 0 ? (
              <Box mt={4}>
                <Typography variant="h6">Border Countries:</Typography>
                <Box
                  display="flex"
                  flexWrap="wrap"
                  gap={1}
                  mt={1}
                  sx={{ width: "100%" }}
                >
                  {neighbors.map((neighbor) => (
                    <Button
                      key={neighbor.cca3}
                      component={Link}
                      to={`/country/${neighbor.name.common}`}
                      sx={{
                        ...commonButtonProps,
                        ...(theme === "dark"
                          ? buttonStyles.dark
                          : buttonStyles.light),
                        flex: "0 1 auto",
                      }}
                    >
                      {neighbor.cca3}
                    </Button>
                  ))}
                </Box>
              </Box>
            ) : (
              <Box mt={4}>
                <Typography variant="body1">
                  <strong>This country has no border countries.</strong>
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}

export default CountryPage;
