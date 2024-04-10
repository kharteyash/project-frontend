import React, { useEffect, useState } from "react";
import WMTable from "../ui-components/table";
import { IP } from "./constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import {IconButton} from "@mui/material"
export default function Orders() {
  const [myOrders, setMyOrders] = useState({});
  const getMyOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/view/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setMyOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);

  const columns = [
    {
      // accessorKey: "product.image",
      header: "Items",
      Cell: ({ row }) => (
        <>
          {row?.original?.orderItems?.map((value, index) => {
            return <p>{value?.name}</p>;
          })}
        </>
      ),
    },
    {
      accessorKey: "orderStatus",
      header: "Order Status",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      // accessorKey: "paymentStatus",
      header: "Buy Again",
      Cell: ({ row }) => (
        <>
            <IconButton value={"Pending Payment"}>
              <AddCardIcon />
            </IconButton>
        </>
      ),
    },
  ];

  console.log("myOrders", myOrders);
  return (
    <div>
      {myOrders?.data && (
        <WMTable
          columns={columns}
          tableTitle={"My Orders"}
          data={myOrders?.data}
        />
      )}
    </div>
  );
}
