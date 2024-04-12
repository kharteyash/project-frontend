import React, { useEffect, useState } from "react";
import WMTable from "../ui-components/table";
import { IP } from "./constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import {IconButton} from "@mui/material"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

export default function Orders() {
  const [myOrders, setMyOrders] = useState({});
  const [myAllOrders, setMyAllOrders] = useState({});
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


  const getMyAllOrders = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/view/orders/history`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setMyAllOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    getMyOrders();
    getMyAllOrders();
  }, []);

  const handleBuyAgain = (orderId) => {
    // navigate
  }

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
      header: "Check Status",
      Cell: ({ row }) => (
        <>{row?.original?.orderStatus === 'Placed' ? 
            <IconButton value={"Check Order Status"}>
              <ArrowCircleRightIcon />
            </IconButton>
            : ''}
        </>
      ),
    },
  ];
  const historyColumns = [
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
      accessorKey: "orderStatus",
      header: "Order Status",
    },
    {
      accessorKey: "subtotalPrice",
      header: "Total Price",
    },
    {
      header: "Buy Again",
      Cell: ({ row }) => (
        <>{row?.original?.orderStatus === 'Delivered' ? 
            <IconButton value={"Pending Payment"}>
              <AddCardIcon onClick={()=>handleBuyAgain(row?.original?._id)}/>
            </IconButton>
            : ''}
        </>
      ),
    },
  ];

  return (
    <div>
      {myOrders?.data && (
        <WMTable
          columns={columns}
          tableTitle={"Current Orders"}
          data={myOrders?.data}
        />
      )}

      {myAllOrders?.data && (
        <WMTable
          columns={historyColumns}
          tableTitle={"Order History"}
          data={myAllOrders?.data}
        />
      )}
    </div>
  );
}
