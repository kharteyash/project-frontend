import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import PropTypes from "prop-types";
import WMTable from "../ui-components/table";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import ArrowCircleUpIcon from "@mui/icons-material/ArrowCircleUp";
import ArrowCircleDownIcon from "@mui/icons-material/ArrowCircleDown";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function Cart() {
  const navigate = useNavigate();
  const [allCart, setAllcart] = useState({});
  const cart = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/view/cart`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setAllcart(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    cart();
  }, []);

  const handleDeleteItem = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/deleteItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const itemDelete = await response.json();
      console.log("user deleted", itemDelete);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    cart();
  };

  const handleDeleteAll = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/delCart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
    cart();
  };

  const handleAddQty = async (event, data) => {
    console.log("data", data);
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/addQty`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const itemadd = await response.json();
      console.log("user deleted", itemadd);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    cart();
  };

  const handleSubQty = async (event, data) => {
    console.log("data", data);
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/subQty`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const itemadd = await response.json();
      console.log("user deleted", itemadd);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    cart();
  };

  const handleBuyAll = () => {
    navigate("/shippingDetails");
  };

  const columns = [
    {
      accessorKey: "product.image",
      header: "Image",
      Cell: ({ row }) => (
        <img
          src={row.original.product.image}
          height={"100px"}
          width={"100px"}
          style={{ objectFit: "cover" }}
        />
      ),
    },
    {
      accessorKey: "product.name",
      header: "Product Name",
    },
    {
      // accessorKey: "quantity",
      header: "Quantity",
      Cell: ({ row }) => (
        <>
          <Grid>
            <IconButton>
              <ArrowCircleUpIcon
                onClick={(e) => handleAddQty(e, row?.original?.product?._id)}
              />
            </IconButton>
            <Typography ml={2}>{row?.original?.quantity}</Typography>
            <IconButton>
              <ArrowCircleDownIcon
                onClick={(e) => handleSubQty(e, row?.original?.product?._id)}
              />
            </IconButton>
          </Grid>
        </>
      ),
    },
    {
      accessorKey: "product.price",
      header: "Price",
    },
    {
      header: "Total Price",
      Cell: ({ row }) => (
        <Typography>
          {row?.original?.product?.price * row?.original?.quantity}
        </Typography>
      ),
    },
    {
      header: "Actions",
      // accessorKey: "actions",
      Cell: ({ row }) => (
        <>
          <IconButton>
            <DeleteIcon
              onClick={(e) => handleDeleteItem(e, row?.original?.product?._id)}
            />
          </IconButton>
          {/* <IconButton>
            <ShoppingCartCheckoutIcon
            // onClick={(e) => moveToCart(e, row?.original)}
            />
          </IconButton> */}
        </>
      ),
    },
  ];
  return (
    <>
      {allCart?.data ? (
        <>
          <WMTable columns={columns} data={allCart?.data} tableTitle={"Cart"} />
          <button onClick={() => handleDeleteAll()}>Delete All</button>
          <button onClick={() => handleBuyAll()}>Buy all</button>
        </>
      ) : (
        <>
          <h1>No Items in Cart</h1>
        </>
      )}
    </>
  );
}
