import React, { useEffect, useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import AddCardIcon from "@mui/icons-material/AddCard";
import { IconButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
export default function ViewOrders() {
  const [allOrders, setAllOrders] = useState({});
  const getAllOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/orders`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getAllOrders();
  }, []);
  console.log("AllOrders", allOrders);
  const columns = [
    {
      header: "User",
      Cell: ({ row }) => (
        <>
          {row?.original?.order?.user?.firstName} {row?.original?.order?.user?.lastName} 
        </>
      ),
    },
    {
      header: "Items",
      Cell: ({ row }) => (
        <>
          {row?.original?.order?.orderItems?.map((value, index) => {
            return <p>{value?.name}</p>;
          })}
        </>
      ),
    },
    {
      accessorKey: "order.paymentMethod",
      header: "Payment Method",
    },
    {
      accessorKey: "order.subtotalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
        {row?.original?.order?.orderStatus === 'Placed' ?(
          <IconButton>
            <DoneAllIcon />
          </IconButton>
          ) : (<></>) }
        </>
      ),
    },
  ];
  return (
    <div>
      {allOrders?.data && (
        <WMTable
          data={allOrders?.data}
          columns={columns}
          tableTitle={"All Orders"}
        />
      )}
    </div>
  );
}
