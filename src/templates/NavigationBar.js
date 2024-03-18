import React from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import { AppBar, Tab, Tabs, Typography } from "@mui/material";
import RegistrationForm from "./RegistrationForm";
import ProfilePage from "./ProfilePage";
import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import "../templates/css/NavigationBar.css";
import ContactUs from "./ContactUS";

export default function NavigationBar() {
  return (
    <>
      <Router>
        <AppBar position="static">
          <Tabs aria-label="navigation tabs" className="nav-tabs">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
            <Link to="/" className="nav-link">
              LogOut
            </Link>
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contact" element={<ContactUs />} />
        </Routes>
      </Router>

      <>
        {/* footer */}
        <div className="contains">
          <div className="frow">
            <div className="footer-col">
              <h4>Categories</h4>
              <ul>
                <li>
                  <a href="/">Home</a>
                </li>
                <li>
                  <a href="/">Exercise</a>
                </li>
                <li>
                  <a href="/">Gallery</a>
                </li>
                <li>
                  <a href="/">About</a>
                </li>
                <li>
                  <a href="/register">Login/Register</a>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Creators</h4>
              <ul>
                <li>Manasi Mhatre</li>
                <li>Aditya Choudhari</li>
                <li>Vishal Ayyori</li>
                <li>Yash Kharte</li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Contact</h4>
              <ul>
                <li>
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
              <div className="social-links">
                <a href="mailto:onlinegym@gmail.com">
                  <i className="fab fa-google" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </>
    </>
  );
}
