import React, { useEffect, useState } from "react";
import {
  Link,
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
  useNavigate,
} from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import {
  AppBar,
  Tab,
  Tabs,
  Typography,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
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
import ProductInfo from "./ProductInfo";
import Wishlist from "./Wishlist";
import Cart from "./Cart";
import ShippingInfo from "./ShippingDetails";
import Orders from "./Orders";
import PaymentInfo from "./PaymentInfo";
import ViewOrderById from "./admin-pages/ViewOrderById";
import UserInfo from "./admin-pages/UserInfo";
import ProductEdit from "./admin-pages/ProductEdit";
import UserProfile from "./UserProfile";

export default function NavigationBar() {
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

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
      window.location.reload();
      // navigate("/home");
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
              <Link to="/login" className="nav-link">
                Login
              </Link>
            ) : (
              <></>
            )}

            {(userDetails?.data?._id && userDetails?.data?.role === "admin") ||
            (userDetails?.data?._id &&
              userDetails?.data?.role === "superadmin") ? (
              <Link to="/dashboard" className="nav-link">
                Dashboard
              </Link>
            ) : (
              ""
            )}
            {userDetails?.data?._id ? (
              <>
                <Link to="/wishlist">
                  <LoyaltyIcon
                    style={{
                      fontSize: "35px",
                      position: "absolute",
                      right: "150px",
                      top: "8px",
                      color: "#0bd2de",
                    }}
                  />
                </Link>
                <Link to="/cart">
                  <ShoppingCartIcon
                    style={{
                      fontSize: "32px",
                      position: "absolute",
                      right: "80px",
                      top: "10px",
                      color: "#0bd2de",
                    }}
                  />
                </Link>
              </>
            ) : (
              <></>
            )}
            {userDetails?.data?._id ? (
              <IconButton
                style={{
                  position: "absolute",
                  // top: "10px",
                  right: "10px",
                  fontSize: "60px",
                  color: "#0bd2de",
                }}
                onClick={(e) => handleOpenMenu(e)}
              >
                <AccountCircleIcon style={{ fontSize: "30px" }} />
              </IconButton>
            ) : (
              <></>
            )}
            <Menu
              anchorEl={menuAnchorEl}
              open={isMenuOpen}
              onClose={() => setIsMenuOpen(false)}
            >
              <MenuItem>
                <Link to="/profile">
                  Profile
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/orders">
                  Orders
                </Link>
              </MenuItem>
              <MenuItem>
                <Link to="/home" className="nav-link" onClick={logoutUser}>
                  Logout <LogoutIcon />
                </Link>
              </MenuItem>
            </Menu>
          </Tabs>
        </AppBar>
        <Routes>
          <Route exact path="/home" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-images" element={<AddImages />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/view-orders" element={<ViewOrders />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/store" element={<ProductStore />} />
          <Route path="/users" element={<AllUsers />} />
          <Route path="/store/product/:productId" element={<ProductInfo />} />
          <Route path="/profile/product/:productId" element={<ProductInfo />} />
          <Route
            path="/add-products/product/:productId"
            element={<ProductEdit />}
          />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/shippingDetails" element={<ShippingInfo />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/paymentInfo" element={<PaymentInfo />} />
          <Route path="/view-order/:id" element={<ViewOrderById />} />
          <Route path="/userInfo/:id" element={<UserInfo />} />
        </Routes>
      </Router>
    </>
  );
}
