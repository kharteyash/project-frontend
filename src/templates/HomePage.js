import React, { useEffect, useState } from "react";
import "../templates/css/NavigationBar.css";
import { IP } from "./constants";

export default function HomePage() {
const [userDetails, setUserDetails] = useState({})
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
  useEffect(()=>{
    details();
  },[])

  console.log("userDetails",userDetails)
  return (
    <div>
      <div className="">
        <h1>Workout hub</h1>
        <p>Get In, Get Fit, Get On with Life!</p>
      </div>

      {/* manasi pls decorate */}
    </div>
  );
}
