import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { IP } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ViewOrderById() {
  const location = useLocation();
  const order = location?.state;
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [delboyData, setDelboyData] = useState({});
  const [orderById, setOrderById] = useState({});

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };

  const delboys = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/getDelBoys`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setDelboyData(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getOrderById = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      setOrderById(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    delboys();
    getOrderById();
  }, []);

  const handleCompleteOrder = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/complete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const completeOrder = await response.json();
      toast.success(completeOrder?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleAssignOrder = async (empId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${order?._id}/assign/${empId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const assignOrder = await response.json();
      toast.success(assignOrder?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <>
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <div>
        <h1>
          Name : {order?.user?.firstName} {order?.user?.lastName}
        </h1>
        <h1>{order?.shippingInfo?.phoneNo}</h1>
        <h2>Items Ordered :</h2>
        {order?.orderItems?.map((value, index) => {
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
          {order?.subtotalPrice}
        </h3>

        <h3>Order Status : {orderById?.data?.orderStatus}</h3>
        <h3>Payment method : {order?.paymentMethod}</h3>
        <br></br>
        <h2>Shipping Info :</h2>
        <h5>Address : {order?.shippingInfo?.address}</h5>
        <h5>City : {order?.shippingInfo?.city}</h5>
        <h5>Pincode : {order?.shippingInfo?.pincode}</h5>
        <h5>State : {order?.shippingInfo?.state}</h5>
        <h5>country : {order?.shippingInfo?.country}</h5>
      </div>
      {order?.orderStatus === "Placed" && (
        <>
          <button onClick={(e) => handleOpenMenu(e)}>
            Assign Delivery Person
          </button>
          <Menu
            anchorEl={menuAnchorEl}
            open={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
          >
            {delboyData?.data?.map((value, index) => {
              return (
                <MenuItem onClick={() => handleAssignOrder(value?._id)}>
                  {value?.userName}
                </MenuItem>
              );
            })}
          </Menu>
          <button onClick={() => handleCompleteOrder()}>Complete Order</button>
        </>
      )}
      {order?.orderStatus === "Approved" && (
      )}
    </>
  );
}
