import React, { useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";

export default function CartAbandon() {
  const [seeCartAbandon, setSeeCartAbandon] = useState(false);
  const [abandonUsers, setAbandonUsers] = useState({});
  const navigate = useNavigate();

  const handleRunCartAbandon = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/cartAbandon`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getabandonnedusers = await response.json();
      setSeeCartAbandon(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGetCartAbandonUsers = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/cartAbandon/getUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getabandonnedusers = await response.json();
      setAbandonUsers(getabandonnedusers);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenUserDetails = (data) => {
    navigate(`/userInfo/${data?.id}`, { state: data });
  };

  const columns = [
    {
      accessorKey: "userName",
      header: "User Name",
    },
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell: ({ row }) => (
        <>
          <IconButton style={{ color: "#3498DB" }}>
            <ArrowCircleRightIcon
              onClick={() => handleOpenUserDetails(row?.original)}
            />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <div>
      <div>
        {!seeCartAbandon ? (
          <button
            onClick={() => {
                handleRunCartAbandon();
            }}
          >
            Get Cart Abandonment Details
          </button>
        ) : (
          <button
            onClick={() => {
              handleGetCartAbandonUsers();
            }}
          >
            See Cart Abandonned Users
          </button>
        )}
      </div>
      {abandonUsers?.data && (
        <WMTable
          tableTitle={"Users with cart abandonment possibility"}
          data={abandonUsers?.data}
          columns={columns}
        />
      )}
    </div>
  );
}
