import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'; // exempel
import CountryPage from './pages/CountryPage'; // din CountryPage
import Navbar from './components/Navbar'; // om du har en Navbar

function App() {
  const [theme, setTheme] = useState('light');

  // Växla mellan dark och light
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    document.documentElement.className = ''; // rensa gammal class
    document.documentElement.classList.add('app', theme);
  }, [theme]);

  return (
    <Router>
      {/* Om du har en Navbar kan du skicka ner toggleTheme */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path="/" element={<HomePage theme={theme} />} />
        <Route path="/country/:name" element={<CountryPage theme={theme} />} />
      </Routes>
    </Router>
  );
}

export default App;


