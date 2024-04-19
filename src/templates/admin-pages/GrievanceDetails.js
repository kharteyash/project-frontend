import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { IP } from "../constants";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function GrievanceDetails() {
  const location = useLocation();
  const [grievanceDetails, setGrievanceDetails] = useState();

  const gId = location?.state;

  const viewGrievance = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences/${gId}`,
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
      setGrievanceDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    viewGrievance();
  }, []);

  const handleClick = async (text) => {
    const formData = {
      answer: text,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences/${gId}/response`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const sendGrievance = await response.json();
      toast.success(sendGrievance?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
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
        <h1>
          Name : {grievanceDetails?.data?.user?.firstName}{" "}
          {grievanceDetails?.data?.user?.lastName}
        </h1>
        <h1>Concern : {grievanceDetails?.data?.gtype}</h1>

        <h3>Message : {grievanceDetails?.data?.message}</h3>
      </>
      {grievanceDetails?.data?.gtype === "employement_request" && (
        <>
          <button value="Yes" onClick={() => handleClick("Yes")}>
            Yes
          </button>
          <button value="No" onClick={() => handleClick("No")}>
            No
          </button>
        </>
      )}
    </div>
  );
}