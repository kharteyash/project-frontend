import React, { useEffect, useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import AddCardIcon from "@mui/icons-material/AddCard";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

export default function ViewOrders() {
  const navigate = useNavigate();
  const [placedOrders, setPlacedOrders] = useState({});
  const [deliveredOrders, setDeliveredOrders] = useState({});

  const getPlacedOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/orders/placed`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setPlacedOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getDeliveredOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/orders/delivered`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setDeliveredOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getPlacedOrders();
    getDeliveredOrders();
  }, []);



  const handleViewOrder = (order) => {
    navigate(`/view-order/${order?._id}`, { state: order });
  };
  const columns = [
    {
      header: "User",
      Cell: ({ row }) => (
        <>
          {row?.original?.user?.firstName}{" "}
          {row?.original?.user?.lastName}
        </>
      ),
    },
    {
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
      accessorKey: "paymentMethod",
      header: "Payment Method",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <IconButton>
            <ArrowCircleRightIcon
              onClick={() => handleViewOrder(row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <div>
      {placedOrders?.data && (
        <>
          <WMTable
            data={placedOrders?.data}
            columns={columns}
            tableTitle={"Placed Orders"}
          />
        </>
      )}
      {deliveredOrders?.data && (
        <>
          <WMTable
            data={deliveredOrders?.data}
            columns={columns}
            tableTitle={"Delivered Orders"}
          />
        </>
      )}
    </div>
  );
}
