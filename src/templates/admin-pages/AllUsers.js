import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import PropTypes from "prop-types";
import WMTable from "../../ui-components/table";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

function UserDialog(props) {
  const { onClose, open } = props;
  const handleClose = () => {
    onClose(true);
  };
  const handleAdminDialog = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${props?.selectedId}/makeadmin`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const userAdmin = await response.json();
      console.log("User admin", userAdmin);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleUserDialog = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${props?.selectedId}/makeuser`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const makeUser = await response.json();
      console.log("User", makeUser);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container xs={12} lg={12} sm={12}>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Change User Role</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <ListItemButton onClick={(e) => handleAdminDialog(e, props?.selectedId)}>
              Admin
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={(e) => handleUserDialog(e, props?.selectedId)}>
              User
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Grid>
  );
}
//
function UserDeleteDialog(props) {
  const { onClose, open } = props;

  const handleClose = () => {
    onClose(true);
  };

  const handleDeleteDialog = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${data}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const userDelete = await response.json();
      console.log("user deleted", userDelete);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Grid container xs={12} lg={12} sm={12}>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Delete User</DialogTitle>
        <List sx={{ pt: 0 }}>
          <ListItem>
            <ListItemButton
              onClick={(e) => handleDeleteDialog(e, props?.selectedId)}
            >
              Confirm Delete
            </ListItemButton>
          </ListItem>
        </List>
      </Dialog>
    </Grid>
  );
}

UserDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

UserDeleteDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
};

export default function AllUsers() {
  const [allUserDetails, setAllUserDetails] = useState({});
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [selectedId, setSelectedId] = useState();

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

  const openDeleteDialog = (e, id) => {
    setSelectedId(id?._id);
    setDeleteDialog(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialog(false);
  };

  const openEditDialog = (e, id) => {
    setSelectedId(id?._id);
    setEditDialog(true);
  };

  const closeEditDialog = () => {
    setEditDialog(false);
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
                  onClick={(e) => openDeleteDialog(e, row?.original)}
                />
              </IconButton>
              <IconButton>
                <AddCircleOutlineIcon
                  onClick={(e) => openEditDialog(e, row?.original)}
                />
              </IconButton>
            </>
          ) : (
            <></>
          )}
          {row?.original?.role === "admin" ? (
            <>
              <IconButton>
                <DeleteIcon
                  onClick={(e) => openDeleteDialog(e, row?.original)}
                />
              </IconButton>
              <IconButton>
                <RemoveCircleOutlineIcon
                  onClick={(e) => openEditDialog(e, row?.original)}
                />
              </IconButton>
            </>
          ) : (
            <></>
          )}
        </>
      ),
    },
  ];

  return (
    <div>
      {allUserDetails?.data && (
        <>
          <WMTable
            columns={columns}
            data={allUserDetails?.data}
            tableTitle={"All Users"}
          />
          <UserDialog
            open={editDialog}
            onClose={closeEditDialog}
            selectedId={selectedId}
          />
          <UserDeleteDialog
            open={deleteDialog}
            onClose={closeDeleteDialog}
            selectedId={selectedId}
          />
        </>
      )}
    </div>
  );
}
