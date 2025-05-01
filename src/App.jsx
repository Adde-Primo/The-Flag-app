import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; 
import CountryPage from './pages/CountryPage'; 
import NavBar from './components/NavBar';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.className = '';
    document.documentElement.classList.add('app', theme);
  }, [theme]);

  return (
    <Router>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} />} />
        <Route path="/country/:name" element={<CountryPage theme={theme} />} />
      </Routes>
    </Router>
  );
}

export default App;


