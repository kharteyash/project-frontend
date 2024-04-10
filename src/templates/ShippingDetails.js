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
  import React, { useEffect, useState } from "react";
  import { IP } from './constants.js'
  import { useNavigate } from "react-router-dom";
  
  
  export default function ShippingInfo() {
    const [allShippingDetails, setAllShippingDetails] = useState({});
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("")
    const [pincode, setPincode] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const navigate=useNavigate();
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      const formData = {
        address,
        city,
        state,
        phoneNo,
        pincode,
        country,
      };
  
      try {
        const response = await fetch(`http://${IP}:5000/api/users/shippingDetails`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include", 
        });
  
        const data = await response.json();
        console.log(data);
        // navigate("/");
      } catch (error) {
        console.error("Error:", error);
      }
    };

    const getShippingDetails = async () => {
        try {
          const response = await fetch(`http://${IP}:5000/api/users/get-shipping`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            // body: JSON.stringify(details),
            credentials: "include",
          });
          const data = await response.json();
          setAllShippingDetails(data);
        } catch (error) {
          console.error("Error:", error);
        }
      };
      useEffect(() => {
        getShippingDetails();
      }, []);    

      console.log("allShippingDetails", allShippingDetails)

    return (
      <>
        <h1>Shipping Details</h1>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Phone Number</InputLabel>
              <TextField
                placeholder="Enter Phone Number"
                id="phoneNo"
                name="phoneNo"
                fullWidth
                value={allShippingDetails?.data?.phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Address</InputLabel>
              <TextField
                placeholder="Enter Address"
                id="address"
                name="address"
                fullWidth
                value={allShippingDetails?.data?.address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your City</InputLabel>
              <TextField
                placeholder="Enter City"
                id="city"
                name="city"
                fullWidth
                value={allShippingDetails?.data?.city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Pincode</InputLabel>
              <TextField
                placeholder="Enter Pincode"
                id="pincode"
                name="pincode"
                fullWidth
                value={allShippingDetails?.data?.pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </Grid> 
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your State</InputLabel>
              <TextField
                placeholder="Enter State"
                id="state"
                name="state"
                fullWidth
                value={allShippingDetails?.data?.state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Enter Your Country</InputLabel>
              <TextField
                placeholder="Enter Country"
                id="country"
                name="country"
                fullWidth
                value={allShippingDetails?.data?.country}
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
  