import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
export default function AllUsers() {
  //http://localhost:5000/api/admin/view/users
  const [allUserDetails, setAllUserDetails] = useState({});

  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      console.log("data", data);
      setAllUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const handleDeleteDialog = async(event, data) => {
    console.log(data?._id);
    try {
        const response = await fetch(`http://${IP}:5000/api/admin/view/users/${data?._id}/delete`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        });
  
        const userDelete = await response.json();
        console.log("user deleted", userDelete);
        // if (!userDetails?.data?.refreshToken) {
        //   navigate("/");
        // }
      } catch (error) {
        console.error("Error:", error);
      }
  };
  const handleEditDialog = async(event, data) => {
    console.log(data?._id);
    try {
        const response = await fetch(`http://${IP}:5000/api/admin/view/users/${data?._id}/makeadmin`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        });
  
        const userAdmin = await response.json();
        console.log("User admin", userAdmin);
        // if (!userDetails?.data?.refreshToken) {
        //   navigate("/");
        // }
      } catch (error) {
        console.error("Error:", error);
      }
  };

  const columns = [
    {
      accessorKey: "firstName",
      header: "First Name",
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "role",
      header: "Role",
    },
    {
      header: "Actions",
      accessorKey: "actions",
      Cell: ({ row }) => (
        <>
          {row?.original?.role === "user" ? (
            <>
              <IconButton>
                <DeleteIcon
                  onClick={(e) => handleDeleteDialog(e, row?.original)}
                />
              </IconButton>
              <IconButton>
                <AddCircleOutlineIcon onClick={(e) => handleEditDialog(e, row?.original)} />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  console.log("all Users", allUserDetails);

  return (
    <div>
      {allUserDetails?.data && (
        <WMTable
          columns={columns}
          data={allUserDetails?.data}
          tableTitle={"All Users"}
        />
      )}
    </div>
  );
}
