import React, { useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";

export default function Sentiments() {
  const [seeNegative, setSeeNegative] = useState(false);
  const [negativeUsers, setNegativeUsers] = useState({});
  const navigate = useNavigate();

  const handleRunSentiments = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/sentiments`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getSentiment = await response.json();
      setSeeNegative(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleGetSentiments = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/sentiments/getUsers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const getSentiment = await response.json();
      setNegativeUsers(getSentiment);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleOpenUserDetails = (data) => {
    console.log(data)
    navigate(`/userInfo/${data?.id}`, { state: data });
  };

  const columns = [
    {
      accessorKey: "user",
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
    <>
      <div>
        {!seeNegative ? (
          <button
            onClick={() => {
              handleRunSentiments();
            }}
          >
            Get Sentiment
          </button>
        ) : (
          <button
            onClick={() => {
              handleGetSentiments();
            }}
          >
            See Negative Users
          </button>
        )}
      </div>
      {negativeUsers?.data && (
        <WMTable
          tableTitle={"Users with Negative Sentiments"}
          data={negativeUsers?.data}
          columns={columns}
        />
      )}
    </>
  );
}
