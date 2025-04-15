import React from 'react';
import './NavBar.css';
import TechoverLogo from '../assets/techover-logo-dark.png';
import TechoverLogoDark from '../assets/techover-logo.png';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function NavBar({ theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <div className="nav-left">
          <h1 className="app-title">The Flag App</h1>
        </div>

        <div className="nav-center">
          {theme === 'dark' ? (
            <img
              src={TechoverLogoDark}
              alt="Techover Logo Dark"
              className="techover-logo"
            />
          ) : (
            <img
              src={TechoverLogo}
              alt="Techover Logo"
              className="techover-logo"
            />
          )}
        </div>

        <div className="nav-right">
          <button className="theme-button" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <Brightness4Icon className="theme-icon" />
                DARK MODE
              </>
            ) : (
              <>
                <Brightness7Icon className="theme-icon" />
                LIGHT MODE
              </>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;


