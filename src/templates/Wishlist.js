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
  console.log("allWishlist", allWishlist);
  useEffect(() => {
    wishlist();
  }, []);

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
            // onClick={(e) => removeFromWishlist(e, row?.original)}
            />
          </IconButton>
          <IconButton>
            <ShoppingCartCheckoutIcon
            // onClick={(e) => moveToCart(e, row?.original)}
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
