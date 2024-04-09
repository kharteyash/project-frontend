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
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

export default function Wishlist() {
  const [allWishlist, setAllWishlist] = useState({});
  const wishlist = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist`,
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
      setAllWishlist(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    wishlist();
  }, []);

  const moveToCart = async (event, data) => {
    console.log("data",data)
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${data?._id}/moveToCart`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const itemMove = await response.json();
      console.log("item deleted", itemMove);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
    wishlist();
  };

  const handleDeleteItem = async (event, data) => {
    console.log("data",data?._id)
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${data?._id}/removeItem`,
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
    wishlist();
  };

  const columns = [
    {
      accessorKey: "image",
      header: "Image",
      Cell:({row}) =>(
        <>
          <img src={row?.original?.image} height={"100px"} width={"100px"} style={{objectFit:"cover"}} />
        </>
      )
    },
    {
      accessorKey: "name",
      header: "Product Name",
    },
    {
      accessorKey: "price",
      header: "Price",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      Cell: ({ row }) => (
        <>
          <IconButton>
            <DeleteIcon
            onClick={(e) => handleDeleteItem(e, row?.original)}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartCheckoutIcon
            onClick={(e) => moveToCart(e, row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <>
      {allWishlist?.data && (
        <WMTable
          columns={columns}
          data={allWishlist?.data}
          tableTitle={"Wishlist"}
        />
      )}
    </>
  );
}
