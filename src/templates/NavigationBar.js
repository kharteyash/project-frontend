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
import Dashboard from "./Dashboard";
import AddImages from "./admin-pages/AddImages";
import AddProducts from "./admin-pages/AddProducts";
import ViewOrders from "./admin-pages/ViewOrders";
import Gallery from "./Gallery";
import ProductStore from "./ProductStore";
import "bootstrap/dist/css/bootstrap.css";

export default function NavigationBar() {
  //fetch user details api here

  const logoutUser = () => {
    //write logic when api is complete
  };

  return (
    <>
      <Router>
        <AppBar position="static">
          <Tabs aria-label="navigation tabs" className="nav-tabs">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
            <Link to="/store" className="nav-link">
              Store
            </Link>
            <Link to="/register" className="nav-link">
              Register
            </Link>
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            {/* {user?.role === 'admin' ? <>
        <Link to="/add-images" classname="nav-link">Add Images</Link>
        <Link to="/add-products" classname="nav-link">Add Products</Link>   uncomment this when fetch user api is called and change the key from user?.role to which comes from the api
        <Link to="/view-orders" classname="nav-link">View Orders</Link>
        <Link to="/register" classname="nav-link">Generate Admin</Link>   when admin wants to add other people as admins
        </>
        : <></>
  } */}
            {/* {user?.loggedIn ? <Link to="/" className="nav-link" onClick="logoutUser     ithe put api call karaychi jyat user ch login status logged out hoil">
              Logout
            </Link>
            : <></>} 
            */}
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-images" element={<AddImages />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/store" element={<ProductStore />} />
        </Routes>
      </Router>
    </>
  );
}
