import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import CountryPage from './pages/CountryPage';
import HomePage from './pages/HomePage';
import PageNotFound from './pages/PageNotFound';

function App() {

  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <NavBar theme={theme} toggleTheme={toggleTheme} />
        <div className="container">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/country/:name" element={<CountryPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;

