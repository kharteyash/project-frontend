import React, { useState } from "react";
import { useLocation } from "react-router";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { IP } from "./constants";
import { TextField } from "@mui/material";

export default function OrderDetails() {
  const location = useLocation();
  console.log("locatiojn", location?.state);
  const details = location?.state?.details;
  const role = location?.state?.role;
    const [enterOTP, setEnterOTP] = useState();
  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/${details?._id}/sendOTP`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const sendOTP = await response.json();
      // toast.success(deleteReview?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerifyOTP = async() => {
    const formData = {
        otp: enterOTP,
    }
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/${details?._id}/verifyOTP`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const verifyOTP = await response.json();
      // toast.success(deleteReview?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div>
        {role === "employee" && (
          <>
            <h1>
              Name : {details?.user?.firstName} {details?.user?.lastName}
            </h1>
            <h1>{details?.shippingInfo?.phoneNo}</h1>
          </>
        )}  
        <h2>Items Ordered :</h2>
        {details?.orderItems?.map((value, index) => {
          return (
            <>
              <h3>
                {value?.name}
                {" | "}
                {"Price : "}
                {value?.netprice}
              </h3>
            </>
          );
        })}
        <h3>
          <br></br>
          Final Price (including gst) : <CurrencyRupeeIcon />
          {details?.subtotalPrice}
        </h3>

        <h3>Order Status : {details?.orderStatus}</h3>
        <h3>Payment method : {details?.paymentMethod} </h3>
        <br></br>
        <h2>Shipping Info :</h2>
        <h5>Address : {details?.shippingInfo?.address}</h5>
        <h5>City : {details?.shippingInfo?.city}</h5>
        <h5>Pincode : {details?.shippingInfo?.pincode}</h5>
        <h5>State : {details?.shippingInfo?.state}</h5>
        <h5>country : {details?.shippingInfo?.country}</h5>
      </div>

      {role === "employee" && (
        <>
          <button onClick={() => handleSendOTP()}>Send OTP</button>
          <TextField onChange={(e)=>setEnterOTP(e.target.value)}/>
          <button onClick={()=>handleVerifyOTP()}>Verify OTP</button>
        </>
      )}
    </div>
  );
}
