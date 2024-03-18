import { Grid, InputLabel, TextField, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      userName,
      password,
    };
    try {
      const response = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to Login");
      }

      const data = await response.json();
      navigate("/")

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Login User
          </Typography>
        </Grid>
        <form onSubmit={handleSubmit}>
          <Grid item xs={12}>
            <InputLabel>Enter Your UserName</InputLabel>
            <TextField
              placeholder="Enter Username"
              id="userName"
              name="username"
              fullWidth
              onChange={(e) => setUserName(e.target.value)}
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
            <Button variant="contained" type="submit" fullWidth sx={{ mt: 2 }}>
              Submit
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              Don't have an account? <Link to="/register">Register here</Link>
            </Typography>
          </Grid>
        </form>
      </Grid>
    </>
  );
}
