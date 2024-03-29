import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { IP } from './constants.js'


export default function ProfilePage() {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("")
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      age,
      weight,
      height,
      goal,
      gender,
      city,
      country,
    };

    try {
      console.log("Aala update la", formData)
      const response = await fetch(`http://${IP}:5000/api/users/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h1>User Profile</h1>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6}>
            <InputLabel>Enter Your Age</InputLabel>
            <TextField
              placeholder="Enter Age"
              id="age"
              name="age"
              fullWidth
              onChange={(e) => setAge(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Enter Your Weight</InputLabel>
            <TextField
              placeholder="Enter Weight"
              id="weight"
              name="weight"
              fullWidth
              onChange={(e) => setWeight(e.target.value)}
            />
          </Grid> 
          <Grid item xs={12} sm={6}>
            <InputLabel>Enter Your Height</InputLabel>
            <TextField
              placeholder="Enter Height"
              id="height"
              name="height"
              fullWidth
              onChange={(e) => setHeight(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Enter Your Gender</InputLabel>
            <RadioGroup
              aria-label="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel>Enter Your Goal</InputLabel>
            <RadioGroup
              aria-label="goal"
              name="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            >
              <FormControlLabel value="bulk" control={<Radio />} label="bulk" />
              <FormControlLabel value="cut" control={<Radio />} label="cut" />
              <FormControlLabel value="lean" control={<Radio />} label="lean" />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enter your City</InputLabel>
            <TextField
              placeholder="Enter City"
              id="city"
              name="city"
              fullWidth
              onChange={(e) => setCity(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <InputLabel>Enter Country</InputLabel>
            <TextField
              placeholder="Enter Country"
              id="country"
              name="country"
              fullWidth
              onChange={(e) => setCountry(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
