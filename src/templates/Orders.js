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
      header: "Paymment Status",
      Cell: ({ row }) => (
        <>
          {row?.original?.paymentStatus === "Pending" ? (
            <IconButton value={"Pending Payment"}>
              <AddCardIcon />
            </IconButton>
          ) : (
            "Completed"
          )}
        </>
      ),
    },
    // {
    //   accessorKey: "product.price",
    //   header: "Price",
    // },
    // {
    //   header: "Total Price",
    //   Cell: ({ row }) => (
    //     <Typography>
    //       {row?.original?.product?.price * row?.original?.quantity}
    //     </Typography>
    //   ),
    // },
    // {
    //   header: "Actions",
    //   // accessorKey: "actions",
    //   Cell: ({ row }) => (
    //     <>
    //       <IconButton>
    //         <DeleteIcon
    //           onClick={(e) => handleDeleteItem(e, row?.original?.product?._id)}
    //         />
    //       </IconButton>
    //       {/* <IconButton>
    //         <ShoppingCartCheckoutIcon
    //         // onClick={(e) => moveToCart(e, row?.original)}
    //         />
    //       </IconButton> */}
    //     </>
    //   ),
    // },
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
