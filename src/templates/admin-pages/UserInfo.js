import React, { useEffect, useState } from "react";
import { useLocation, useRouteError } from "react-router-dom";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";

export default function UserInfo() {
  const location = useLocation();
  const [userDets, setUserDets] = useState();
  const userInfo = userDets?.data
  const userDetails = location?.state;

  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/users/${userDetails?._id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });
      const data = await response.json();
      setUserDets(data)
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    details();
  }, []);

  const columns = [
    {
      header: "Order",
      Cell: ({ row }) => (
        <>
          {row?.original?.orderItems.map((value, index) => {
            return (
              <>
                <p>{value?.name}</p>
              </>
            );
          })}
        </>
      ),
    },
    {
      header: "Order Status",
      accessorKey: "orderStatus",
    },
    {
      header: "Payment Method",
      accessorKey: "paymentMethod",
    },
    {
      header: "Total Price",
      accessorKey: "subtotalPrice",
    },
  ];

  const notifColumns = [
    {
      header: "Notifications",
      accessorKey: "message",
    },
  ];

  const handleMakeAdmin = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${userDetails?._id}/makeadmin`,
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
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleMakeUser = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${userDetails?._id}/makeuser`,
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
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleDeleteUser = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${userDetails?._id}/delete`,
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
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <>
        <h2>
          Name : {userInfo?.firstName} {userInfo?.lastName} (
          {userInfo?.userName})
        </h2>
        <h2>Email : {userInfo?.email}</h2>
        <h3>Role : {userInfo?.role}</h3>
        {!(userInfo?.role === "admin" || userInfo?.role === "superadmin") ? (
          <button onClick={() => handleMakeAdmin()}>Make Admin</button>
        ) : (
          <button onClick={() => handleMakeUser()}>Make User</button>
        )}
        {userInfo?._id && <button onClick={()=>handleDeleteUser()}>Delete User</button>}
      </>
      {userInfo?.orderHistory && (
        <WMTable
          data={userInfo?.orders}
          tableTitle={"All Orders"}
          columns={columns}
        />
      )}

      {userInfo?.notifications && (
        <WMTable
          data={userInfo?.notifications}
          tableTitle={"All Notifications"}
          columns={notifColumns}
        />
      )}
      <input type="text" />
      <input type="submit" value={"Send Notification"}/>
    </div>
  );
}
