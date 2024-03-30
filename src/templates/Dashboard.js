import React from "react";
import { Link } from "react-router-dom";
// import WMTable from "../ui-components/table";
export default function Dashboard() {

  return (
    <>
      {/* <WMTable /> */}
      Admin Dashboard
      {/* things to show 
      
      1) no. of users registered in last 1 month
      2) no. of items purchased
      3) amount of money made

       baaki aur kya chaiye daal do
      
      */}
      
        <>
          <Link to="/users" classname="nav-link">
            Users
          </Link>
          <Link to="/add-images" classname="nav-link">
            Images
          </Link>
          <Link to="/add-products" classname="nav-link">
            Products
          </Link>
          <Link to="/view-orders" classname="nav-link">
            View Orders
          </Link>
          {/* <Link to="/register" classname="nav-link">
            Generate Admin
          </Link> */}
        </>
      
    </>
  );
}
