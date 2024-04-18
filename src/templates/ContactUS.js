import {
  FormControlLabel,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useState } from "react";
import { IP } from "./constants";

export default function ContactUS() {
  const [gtype, setGType] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      gtype,
      message,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/greviences/send`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      alert("Grievences sent successfully")
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        <form onSubmit={handleSubmit}>
          <InputLabel>Type : </InputLabel>
          <RadioGroup
            aria-label="type"
            name="type"
            id="type"
            onChange={(e) => setGType(e.target.value)}
          >
            <FormControlLabel
              value="employement_request"
              control={<Radio />}
              label="employement_request"
            />
            <FormControlLabel
              value="customer_care"
              control={<Radio />}
              label="customer_care"
            />
          </RadioGroup>
          <InputLabel>Message :</InputLabel>
          <TextField
            multiline
            rows={3}
            onChange={(e) => setMessage(e.target.value)}
          />
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}
