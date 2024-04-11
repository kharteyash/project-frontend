import React, { useEffect, useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import AddCardIcon from "@mui/icons-material/AddCard";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';
import {useNavigate} from "react-router-dom"
import {
  Typography,
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
} from "@mui/material";

function AddDateDialog(props) {
  const [days, setDays] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      days,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/orders/${props?.id}/giveEstimateDays`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      window.location.reload();
      if (!response.ok) {
        throw new Error("Failed to complete order");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={props?.open} onClose={props?.onClose}>
        <DialogTitle>Days until delivery</DialogTitle>
        <TextField
          fullWidth
          placeholder="Enter Days"
          id="days"
          name="days"
          onChange={(e) => setDays(e.target.value)}
        />
        <input
          type="submit"
          value={"Submit"}
          onClick={(e) => handleSubmit(e)}
        />
      </Dialog>
    </>
  );
}

export default function ViewOrders() {
  const navigate = useNavigate()
  const [allOrders, setAllOrders] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();
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

  const handleOpenDialog = (id) => {
    setOpenDialog(true);
    setSelectedId(id);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };


  const handleViewOrder = (order) => {
    console.log("row",order?._id)
    navigate(`/view-order/${order?._id}`, {state:order})
  }
  const columns = [
    {
      header: "User",
      Cell: ({ row }) => (
        <>
          {row?.original?.order?.user?.firstName}{" "}
          {row?.original?.order?.user?.lastName}
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
          {/* {!row?.original?.order?.deliveredAt ? (
            <IconButton>
              <AddCircleOutlineIcon
                onClick={() => handleOpenDialog(row?.original?.order?._id)}
              />
            </IconButton>
          ) : (
            <>
            <IconButton>
              <DoneAllIcon
                onClick={() => handleCompleteOrder(row?.original?.order?._id)}
              />
            </IconButton>
            </>
          )} */}
          <IconButton>
<ArrowCircleRightIcon onClick={() => handleViewOrder(row?.original?.order)}/>
          </IconButton>
        </>
      ),
    },
  ];
  return (
    <div>
      {allOrders?.data && (
        <>
          <WMTable
            data={allOrders?.data}
            columns={columns}
            tableTitle={"All Orders"}
          />
        </>
      )}
    </div>
  );
}
