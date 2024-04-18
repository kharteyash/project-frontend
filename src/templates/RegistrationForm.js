import React, { useState } from "react";
import "../templates/css/Common.css";
import "../templates/css/Registrationf.css";
import { Grid, InputLabel, TextField, Typography, Button } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import { IP } from './constants.js'

export default function RegistrationForm() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName,
      email,
      firstName,
      lastName,
      password,
    };
    if (password === cpassword) {
      try {
        const response = await fetch(`http://${IP}:5000/api/users/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to register");
        }

        const data = await response.json();
        navigate("/login")
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Passwords DO NOT match");
    }
  };
  return (
    <div class="cont-f">
    <div class="box">
    <Grid  justifyContent="center" >
      <Grid item xs={12} >
        <h3 align="center" style={{fontSize:"40px", fontWeight:"bold",}}><span class="span" ></span>Register User</h3>
      </Grid>
      <form onSubmit={handleSubmit} >
        <Grid item xs={12} class="ip_bx">
          <input type="text"
            // placeholder="Enter Username"
            id="userName"
            name="userName"
            fullWidth
            onChange={(e) => setUserName(e.target.value)}
          />
           <label >UserName</label>
        </Grid>
        <Grid item xs={12} class="ip_bx">
          <input type="text"
            // placeholder="Enter First name"
            id="firstName"
            name="firstName"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
          />
          <label>First Name</label>
        </Grid>
        <Grid item xs={12} class="ip_bx">
          
          <input type="text"
            // placeholder="Enter last name"
            id="lastName"
            name="lastName"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
            
          />
          <label>Last Name</label>
        </Grid>
        <Grid item xs={12} class="ip_bx">
          
          <input type="email"
            // placeholder="Enter email"
            id="email"
            name="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>Email</label>
        </Grid>
        <Grid item xs={12} class="ip_bx">
         
          <input 
            // placeholder="Enter Password"
            id="password"
            name="password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
           <label>Password</label>
        </Grid>
        <Grid item xs={12} class="ip_bx">
         
          <input
            // placeholder="Enter Confirm Password"
            name="cpassword"
            type="password"
            fullWidth
            onChange={(e) => setCpassword(e.target.value)}
          />
           <label>Confirm Password</label>
        </Grid>
        <Grid item xs={12} >
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </Grid>
      </form>
      <Grid item xs={12} class="loginl">
        <p align="center">
          Already have an account? <Link to="/login" class="loginlink">Login</Link>
        </p>
      </Grid>
    </Grid>
    </div>
    </div>
  );
}