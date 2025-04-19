import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import ArrowLeftDark from "../assets/arrow-left-dark.svg";
import ArrowLeftLight from "../assets/arrow-left.svg"; // byt till ljus pil om du har
import "./CountryPage.css";

export default function CountryPage({ theme }) {
  const { name } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCountry() {
      setLoading(true);
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${name}?fullText=true`
        );
        const [data] = await res.json();
        setCountry(data);

        if (data.borders) {
          const codes = data.borders.join(",");
          const nbrs = await fetch(
            `https://restcountries.com/v3.1/alpha?codes=${codes}`
          ).then((r) => r.json());
          setNeighbors(nbrs);
        }
      } catch (e) {
        console.error(e);
      }
      setLoading(false);
    }
    fetchCountry();
  }, [name]);

  if (loading) {
    return <div className="loading">Loading…</div>;
  }
  if (!country) {
    return <div className="loading">Country not found</div>;
  }

  const nativeName = country.name.nativeName
    ? Object.values(country.name.nativeName)[0].common
    : "N/A";

  const arrowIcon = theme === "dark" ? ArrowLeftDark : ArrowLeftLight;

  return (
    <main className={`country-page ${theme}`}>
      <button
        className="back-button"
        onClick={() => navigate(-1)}
        aria-label="Go back"
      >
        <img src={arrowIcon} alt="" className="back-icon" />
        <span>BACK</span>
      </button>

      <div className="details">
        <div className="flag-container">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="flag"
          />
        </div>

        <div className="info-container">
          <h1 className="country-name">{country.name.common}</h1>

          <div className="info-columns">
            <div className="info-col">
              <p>
                <strong>Population:</strong> {country.population}
              </p>
              <p>
                <strong>Region:</strong> {country.region}
              </p>
              <p>
                <strong>Capital:</strong>{" "}
                {country.capital ? country.capital[0] : "N/A"}
              </p>
              <p>
                <strong>Native name:</strong> {nativeName}
              </p>
            </div>
            <div className="info-col">
              <p>
                <strong>Top Level Domain:</strong>{" "}
                {country.tld ? country.tld.join(", ") : "N/A"}
              </p>
              <p>
                <strong>Currencies:</strong>{" "}
                {country.currencies
                  ? Object.values(country.currencies)
                      .map((c) => c.name)
                      .join(", ")
                  : "N/A"}
              </p>
              <p>
                <strong>Language:</strong>{" "}
                {country.languages
                  ? Object.values(country.languages).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="borders">
            <p className="borders-label">
              <strong>Border Countries:</strong>
            </p>
            <div className="borders-list">
              {neighbors.length > 0 ? (
                neighbors.map((nbr) => (
                  <Link
                    key={nbr.cca3}
                    to={`/country/${nbr.name.common}`}
                    className="border-button"
                  >
                    {nbr.cca3}
                  </Link>
                ))
              ) : (
                <p className="no-borders">
                  <strong>No border countries.</strong>
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
