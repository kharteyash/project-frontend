import React, { useState } from "react";
import WMTable from "../../ui-components/table";
import { IP } from "../constants";
import { IconButton } from "@mui/material";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import { useNavigate } from "react-router";

export default function ViewGrievance() {
    const navigate = useNavigate();
  const [allGrievances, setAllGrievances] = useState();

  const viewAllGrievances = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/greviences`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllGrievances(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useState(() => {
      viewAllGrievances();
    }, []);

    const handleOpenUserDetails = (data) => {
        console.log("data",data)
        navigate(`/grievance-details/${data?._id}`, {state:data?._id})
    }
    
  const columns = [
    {
    //   accessorKey: "user.firstName",
      header: "User Id",
      Cell : ({row}) => (
        <>
            {row?.original?.user?.firstName}  {row?.original?.user?.lastName}
        </>
      ),
    },
    {
      accessorKey: "gtype",
      header: "Grievance Type",
    },
    {
      accessorKey: "actions",
      header: "Actions",
      Cell :({row}) =>(
        <>
            <IconButton>
            <ArrowCircleRightIcon
              onClick={() => handleOpenUserDetails(row?.original)}
            />
            </IconButton>
        </>
      )
    },
]

  return (
    <div>
      <>
        {allGrievances && (
          <WMTable
            columns={columns}
            data={allGrievances?.data}
            tableTitle={"All Grievances"}
          />
        )}
      </>
    </div>
  );
}
