import React, { useEffect, useState } from "react";
import "../templates/css/NavigationBar.css";
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

  const handleSeeNotification = async(notifId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/notifications/${notifId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const viewNotifs = await response.json();
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    notifications();
  }

  return (
    <div style={{ position: "relative" }}>
      <IconButton
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          fontSize: "60px",
        }}
        onClick={(e) => handleOpenNotifications(e)}
      >
        <NotificationsIcon style={{ fontSize: "30px" }} />
      </IconButton>
      <Menu
  anchorEl={menuAnchorEl}
  open={isMenuOpen}
  onClose={() => setIsMenuOpen(false)}
>
  {allNotifications?.data?.map((value, index) => (
      <MenuItem key={value._id} onClick={() => handleSeeNotification(value._id)}>
        {value.message}
      </MenuItem>
    ))}
</Menu>
<p style={{ position: "absolute", top: "10px", right: "14px" }}>
  {allNotifications?.data
    ?.filter((notification) => notification.status === 'unread') // Filter unread notifications
    .length}
</p>
      <div className="">

        <h1>Workout hub</h1>
        <p>Get In, Get Fit, Get On with Life!</p>
      </div>

      {/* manasi pls decorate */}
    </div>
  );
}
