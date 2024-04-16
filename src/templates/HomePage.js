import React, { useEffect, useState } from "react";
import "../templates/css/NavigationBar.css";
import "../templates/css/Common.css";
import { IP } from "./constants";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { IconButton, Menu, MenuItem } from "@mui/material";
export default function HomePage() {
  const [userDetails, setUserDetails] = useState({});
  const [allNotifications, setAllNotifications] = useState({});
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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

  const notifications = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/notifications`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllNotifications(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleOpenNotifications = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  useEffect(()=>{
    details();
  },[])
  useEffect(() => {
    if (userDetails?.data?._id) {
      notifications();
    }
  }, [userDetails?.data]);

  // <style>
  //   .css-hip9hq-MuiPaper-root-MuiAppBar-root {
          
  // </style>

  return (
    <div class="cont" style={{ background:"black", height:"100vh", color:"white" }}>
    <div style={{ position: "relative" }}>
      <IconButton
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "60px",
          color: "#0bd2de",
        }}
        onClick={(e) => handleOpenNotifications(e)}
      >
        <NotificationsIcon style={{ fontSize: "35px" }} />
      </IconButton>
      <Menu
        anchorEl={menuAnchorEl}
        open={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      >
        {allNotifications?.data?.map((value, index) => {
          return <MenuItem>{value?.message}</MenuItem>;
        })}
      </Menu>
      <p style={{ position: "absolute", top: "10px", right: "14px" }}>
        {allNotifications?.data?.length}
      </p>
      <div class="wlcm-msg" style={{border:"1px solid black",  paddingLeft:"20px"}}>
        {/* <div style={{ width:"100%", backgroundColor:"aqua"}}>
          <div style={{backgroundColor:"red", width:"40%", float:"left"}}>
            hi
          </div>
          <div style={{backgroundColor:"blue", width:"60%", float:"left"}}>
            hi
          </div>
          hello
          
          </div> */}
        
        <h1 style={{marginTop:"40px", fontSize:"60px"}}>Workout hub</h1>
        <p>Get In, Get Fit, Get On with Life!</p>
      </div>
{/* <!--slide show--> */}

      <div class="stage">
  
  
<div class="container">
  <div class="ring">
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
    <div class="img"></div>
  </div>
</div>
{/* slideshow end */}

</div>

      {/* manasi pls decorate */}
    </div>
    </div>
  );
 
}
