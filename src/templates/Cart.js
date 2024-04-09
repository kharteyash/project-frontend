import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import PropTypes from "prop-types";
import WMTable from "../ui-components/table";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Cart() {
  const [allCart, setAllcart] = useState({});
  const cart = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
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
    console.log("data",data)
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/deleteItem`,
        {
          method: "DELETE",
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

  const columns = [
    {
      accessorKey: "product.image",
      header: "Image",
      Cell: ({ row }) => (
        <img src={row.original.product.image} height={"100px"} width={"100px"} style={{ objectFit: "cover" }} />
      )
    },
    {
      accessorKey: "product.name",
      header: "Product Name",
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
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
      )
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
      {allCart?.data && (
        <WMTable
          columns={columns}
          data={allCart?.data}
          tableTitle={"Cart"}
        />
      )}
    </>
  );
}
