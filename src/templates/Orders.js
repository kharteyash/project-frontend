import React, { useEffect, useState } from "react";
import WMTable from "../ui-components/table";
import { IP } from "./constants";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCardIcon from "@mui/icons-material/AddCard";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";
export default function Orders() {
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({});
  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });

      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const role = userDetails?.data?.role;

  const [myOrders, setMyOrders] = useState({});
  const [myAllOrders, setMyAllOrders] = useState({});

  const handleBuyAgain = (orderId) => {
    // navigate
  };
  const getUserMyOrders = async () => {
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

  const getEmpMyOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/employee/orders`,
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
      setMyOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getUserMyAllOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/orders/history`,
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
      setMyAllOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getEmpMyAllOrders = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/employee/orders/history`,
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
      setMyAllOrders(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenOrder = (details) => {
    navigate(`/order-details/${details?._id}`, {state:{details,role}})
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
        <>
          <IconButton value={"Check Order Status"} onClick={()=>handleOpenOrder(row?.original)}>
            <ArrowCircleRightIcon />
          </IconButton>
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
        <>
          {row?.original?.orderStatus === "Delivered" ? (
            <IconButton value={"Pending Payment"}>
              <AddCardIcon onClick={() => handleBuyAgain(row?.original?._id)} />
            </IconButton>
          ) : (
            ""
          )}
        </>
      ),
    },
  ];

  useEffect(() => {
    details();
  }, []);

  useEffect(() => {
    if (role === "user") {
      getUserMyOrders();
      getUserMyAllOrders();
    } else {
      getEmpMyOrders();
      getEmpMyAllOrders();
    }
  }, [role]);

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
