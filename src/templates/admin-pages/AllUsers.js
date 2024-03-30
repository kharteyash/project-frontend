import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import WMTable from "../../ui-components/table";

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

  const columns = [
    {
        accessorKey:"firstName",
        header:"First Name"
    },
    {
        accessorKey:"lastName",
        header:"Last Name"
    },
    {
        accessorKey:"email",
        header:"Email"
    },
    {
        accessorKey:"role",
        header:"Role"
    },
  ]

  console.log("all Users", allUserDetails);

  return (
    <div>
      <WMTable 
        columns={columns}
        data={allUserDetails}
        tableTitle={"All Users"}
      />
    </div>
  );
}
