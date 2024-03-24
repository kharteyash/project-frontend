import React, { useState } from "react";
import { Grid, InputLabel, TextField, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { IP } from './constants.js'

export default function RegistrationForm() {
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");

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
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      alert("Passwords DO NOT match");
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <Typography variant="h4" align="center">Register User</Typography>
      </Grid>
      <form onSubmit={handleSubmit}>
        <Grid item xs={12}>
          <InputLabel>Enter Your UserName</InputLabel>
          <TextField
            placeholder="Enter Username"
            id="userName"
            name="userName"
            fullWidth
            onChange={(e) => setUserName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Enter Your First Name</InputLabel>
          <TextField
            placeholder="Enter First name"
            id="firstName"
            name="firstName"
            fullWidth
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Enter Your last Name</InputLabel>
          <TextField
            placeholder="Enter last name"
            id="lastName"
            name="lastName"
            fullWidth
            onChange={(e) => setLastName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Enter Your email</InputLabel>
          <TextField
            placeholder="Enter email"
            id="email"
            name="email"
            fullWidth
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Enter Your Password</InputLabel>
          <TextField
            placeholder="Enter Password"
            id="password"
            name="password"
            type="password"
            fullWidth
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <InputLabel>Enter Confirm Password</InputLabel>
          <TextField
            placeholder="Enter Confirm Password"
            name="cpassword"
            type="password"
            fullWidth
            onChange={(e) => setCpassword(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>Submit</Button>
        </Grid>
      </form>
      <Grid item xs={12}>
        <Typography variant="body1" align="center">
          Already have an account? <Link to="/login">Login here</Link>
        </Typography>
      </Grid>
    </Grid>
  );
}
