import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../templates/css/Userp.css";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function UserInfo() {
  const location = useLocation();
  const [userDets, setUserDets] = useState();
  const [notifMessage, setNotifMessage] = useState();
  const userInfo = userDets?.data;
  const userDetails = location?.state;

  const details = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${userDetails?._id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setUserDets(data);
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
          credentials: "include",
        }
      );
      const userAdmin = await response.json();
      toast.success(userAdmin?.message);
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
          credentials: "include",
        }
      );
      const makeUser = await response.json();
      toast.success(makeUser?.message);
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
          credentials: "include",
        }
      );
      const userDelete = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSendNotifs = async () => {
    const formData = {
      message: notifMessage,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/users/${userDetails?._id}/sendNot`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const notifs = await response.json();
      toast.success(notifs?.message);
      details();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div class="conti">
      <ToastContainer
        position="bottom-left"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition="Bounce"
      />
      <>
        <div class="udetail">
          <div class="info">
            <h2>
              Name : {userInfo?.firstName} {userInfo?.lastName} (
              {userInfo?.userName})
            </h2>
            <h2>Email : {userInfo?.email}</h2>
            <h3>Role : {userInfo?.role}</h3>
          </div>

          <div class="botns">
            {!(
              userInfo?.role === "admin" || userInfo?.role === "superadmin"
            ) ? (
              <button class="botn" onClick={() => handleMakeAdmin()}>
                Make Admin
              </button>
            ) : (
              <button class="botn" onClick={() => handleMakeUser()}>
                Make User
              </button>
            )}
            {userInfo?._id && (
              <button class="botn" onClick={() => handleDeleteUser()}>
                Delete User
              </button>
            )}
          </div>
        </div>
      </>
      <div class="all-orders">
        {userInfo?.orderHistory && (
          <WMTable
            data={userInfo?.orders}
            tableTitle={"All Orders"}
            columns={columns}
          />
        )}
      </div>
      <div class="all-notifs">
        {userInfo?.notifications && (
          <WMTable
            data={userInfo?.notifications}
            tableTitle={"All Notifications"}
            columns={notifColumns}
          />
        )}
      </div>
      <div class="notif">
        <input
          id="notif-txt"
          type="text"
          onChange={(e) => setNotifMessage(e.target.value)}
        />
        <input
          id="butn"
          type="submit"
          value={"Send Notification"}
          onClick={() => handleSendNotifs()}
        />
      </div>
      <>
        <button>Find Similar Users</button>
        <button>Give Custom Recommendations</button>
      </>
    </div>
  );
}
