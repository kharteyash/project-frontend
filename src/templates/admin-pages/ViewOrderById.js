import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import {
    Typography,
    Dialog,
    DialogTitle,
    TextField,
    IconButton,
  } from "@mui/material";
import { IP } from "../constants";

function AddDateDialog(props) {
    const [days, setDays] = useState();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = {
        days,
      };
      try {
        const response = await fetch(
          `http://${IP}:5000/api/admin/view/orders/${props?.id}/giveEstimateDays`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
            credentials: "include",
          }
        );
        window.location.reload();
        if (!response.ok) {
          throw new Error("Failed to complete order");
        }
        const data = await response.json();
      } catch (error) {
        console.error("Error:", error);
      }
    };
  
    return (
      <>
        <Dialog open={props?.open} onClose={props?.onClose}>
          <DialogTitle>Days until delivery</DialogTitle>
          <TextField
            fullWidth
            placeholder="Enter Days"
            id="days"
            name="days"
            onChange={(e) => setDays(e.target.value)}
          />
          <input
            type="submit"
            value={"Submit"}
            onClick={(e) => handleSubmit(e)}
          />
        </Dialog>
      </>
    );
  }

export default function ViewOrderById() {
  const location = useLocation();
  const order = location?.state;
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const handleOpenDialog = () => {
    setOpenDialog(true);
    setSelectedId(order?._id);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleCompleteOrder = async() => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to complete order");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  } 
  return (
    <>
    <div>
      <h1>
        Name : {" "}
        {order?.user?.firstName} {order?.user?.lastName}
      </h1>
      <h1>
        {order?.shippingInfo?.shippingInfo?.phoneNo}
      </h1>
<h2>
    Items Ordered : 
</h2>
      {order?.orderItems?.map((value, index) => {
        return (
          <>
            <h3>{value?.name}{" | "}{"Price : "}{value?.netprice}</h3>
          </>
        );
      })}
    <h3>
        <br></br>
        Final Price (including gst) : <CurrencyRupeeIcon />
      {order?.subtotalPrice}
    </h3>
      


      <h3>
       Order Status : {order?.orderStatus}
      </h3>
      <h3>
       Payment method : {order?.paymentMethod}
      </h3>
<br></br>
      <h2>
        Shipping Info : 
      </h2>
      <h5>Address : {order?.shippingInfo?.shippingInfo?.address}</h5>
      <h5>City : {order?.shippingInfo?.shippingInfo?.city}</h5>
      <h5>Pincode : {order?.shippingInfo?.shippingInfo?.pincode}</h5>
      <h5>State : {order?.shippingInfo?.shippingInfo?.state}</h5>
      <h5>country : {order?.shippingInfo?.shippingInfo?.country}</h5>
    </div>
    {order?.orderStatus ==='Placed' &&
    <>
    <button onClick={()=>handleOpenDialog()}>
      Add delivery days
    </button>
    <button onClick={()=>handleCompleteOrder()}>
        Order Completed
    </button>
    </>
    }
    <AddDateDialog open={openDialog} id={selectedId} onClose={handleClose} />

    </>
  );
}
