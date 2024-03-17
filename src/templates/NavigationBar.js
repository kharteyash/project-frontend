import React from 'react';
import { Link, BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import { AppBar, Tab, Tabs, Typography } from '@mui/material';
import RegistrationForm from './RegistrationForm';
import ProfilePage from './ProfilePage';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import '../templates/css/NavigationBar.css'

export default function NavigationBar() {
  return (
    <>
    <Router>
      <AppBar position="static">
        <Tabs aria-label="navigation tabs" className="nav-tabs">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/register" className="nav-link">Register</Link>
        <Link to="/profile" className="nav-link">Profile</Link>
        </Tabs>
      </AppBar>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
    </>
  );
}
