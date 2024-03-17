import { Grid, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { dispatch } from '../store';
import { registerUser } from '../store/slices/userReducer';

export default function RegistrationForm() {

  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    const formData = {
      userName,
      firstName,
      lastName,
      password,
      email,
    };
    console.log(formData);
    dispatch(registerUser(formData))
  }

  return (
    <>
      <h1>Hello</h1>
      <form onSubmit={handleSubmit}>
        <Grid>

          <InputLabel>Enter Your UserName</InputLabel>
          <TextField placeholder="Enter Username" id="username"  name="username" onChange={e => setUserName(e.target.value)} />

          <InputLabel>Enter Your First Name</InputLabel>
          <TextField placeholder="Enter First name" id="firstname" name="firstname" onChange={e => setFirstName(e.target.value)} />

          <InputLabel>Enter Your last Name</InputLabel>
          <TextField placeholder="Enter last name" id="lastname" name="lastname" onChange={e => setLastName(e.target.value)} />

          <InputLabel>Enter Your email</InputLabel>
          <TextField placeholder="Enter email" id="email" name="email" onChange={e => setEmail(e.target.value)} />

          <InputLabel>Enter Your Password</InputLabel>
          <TextField placeholder="Enter Password" id="password" name="password" onChange={e => setPassword(e.target.value)} />

          <InputLabel>Enter Confirm Password</InputLabel>
          <TextField placeholder="Enter Confirm Password" name="cpassword" onChange={e => setCpassword(e.target.value)} />

          <button type="submit">Submit</button>
        </Grid>
      </form>
    </>
  )
}
