import React, { useEffect, useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useNavigate,
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
import { IP } from "./constants";
import AllUsers from "./admin-pages/AllUsers";

export default function NavigationBar() {
  const [userDetails, setUserDetails] = useState({});
  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    details();
  }, []);
  console.log(userDetails);

  const logoutUser = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });

      const logout = await response.json();
      console.log("logout", logout);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Router>
        <AppBar position="static">
          <Tabs aria-label="navigation tabs" className="nav-tabs">
            <Link to="/home" className="nav-link">
              Home
            </Link>
            <Link to="/gallery" className="nav-link">
              Gallery
            </Link>
            <Link to="/store" className="nav-link">
              Store
            </Link>
            {!userDetails?.data?._id ? (
              <Link to="/register" className="nav-link">
                Register
              </Link>
            ) : (
              <></>
            )}
            <Link to="/profile" className="nav-link">
              Profile
            </Link>
            {userDetails?.data?.role === 'admin' || 'superadmin' ?
            <Link to="/dashboard" className="nav-link">Dashboard</Link>
            : <></>}
            {userDetails?.data?._id ? (
              <Link to="/" className="nav-link" onClick={logoutUser}>
                Logout
              </Link>
            ) : (
              <></>
            )}
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-images" element={<AddImages />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/store" element={<ProductStore />} />
          <Route path="/users" element={<AllUsers />} />
        </Routes>
      </Router>
    </>
  );
}
