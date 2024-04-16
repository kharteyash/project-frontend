import {
  FormControlLabel,
  Grid,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { IP } from "./constants.js";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import CloseIcon from "@mui/icons-material/Close";

export default function ProfilePage() {
  const [profileDetails, setProfileDetails] = useState({});
  
  const [editDetails, setEditDetails] = useState(false);
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [gender, setGender] = useState("");
  const [goal, setGoal] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  const handleProfileEdit = () => {
    setEditDetails(!editDetails);
  };
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
      const response = await fetch(`http://${IP}:5000/api/users/profile`, {
        method: "PUT",
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
      getProfileDetails()
      handleProfileEdit();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getProfileDetails = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setProfileDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  

  useEffect(() => {
    getProfileDetails();
  }, []);

  return (
    <>
      <h1>User Profile</h1>
      <IconButton onClick={() => handleProfileEdit()}>
        {!editDetails ? <EditIcon /> : <CloseIcon />}
      </IconButton>
      {!editDetails ? (
        <>
          <InputLabel>Age :</InputLabel>
          {profileDetails?.data?.age}
          <InputLabel>Height :</InputLabel>
          {profileDetails?.data?.height}
          <InputLabel>Weight :</InputLabel>
          {profileDetails?.data?.weight}
          <InputLabel>Gender :</InputLabel>
          {profileDetails?.data?.gender}
          <InputLabel>Goal :</InputLabel>
          {profileDetails?.data?.goal}
          <InputLabel>City :</InputLabel>
          {profileDetails?.data?.city}
          <InputLabel>Country :</InputLabel>
          {profileDetails?.data?.country}
        </>
      ) : (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Age</InputLabel>
              <TextField
                placeholder="Enter Age"
                id="age"
                name="age"
                fullWidth
                defaultValue={profileDetails?.data?.age}
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
                defaultValue={profileDetails?.data?.weight}
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
                defaultValue={profileDetails?.data?.height}
                onChange={(e) => setHeight(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Gender</InputLabel>
              <RadioGroup
                aria-label="gender"
                name="gender"
                id="gender"
                // value={gender}
                defaultValue={profileDetails?.data?.gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <FormControlLabel
                  value="male"
                  control={<Radio />}
                  label="Male"
                />
                <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Goal</InputLabel>
              <RadioGroup
                aria-label="goal"
                name="goal"
                id="goal"
                // value={goal}
                selected={profileDetails?.data?.goal}
                defaultValue={profileDetails?.data?.goal}
                onChange={(e) => setGoal(e.target.value)}
              >
                <FormControlLabel
                  value="bulk"
                  control={<Radio />}
                  label="bulk"
                />
                <FormControlLabel value="cut" control={<Radio />} label="cut" />
                <FormControlLabel
                  value="lean"
                  control={<Radio />}
                  label="lean"
                />
              </RadioGroup>
            </Grid>
            <Grid item xs={12}>
              <InputLabel>Enter your City</InputLabel>
              <TextField
                placeholder="Enter City"
                id="city"
                name="city"
                fullWidth
                defaultValue={profileDetails?.data?.city}
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
                defaultValue={profileDetails?.data?.country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} style={{ textAlign: "center" }}>
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Grid>
          </Grid>
        </form>
      )}
    </>
  );
}
