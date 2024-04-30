import React from "react";
import { Link } from "react-router-dom";
import { styled } from "@mui/material/styles";
import "../templates/css/Dashboard.css";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { Typography } from "@mui/material";

// import WMTable from "../ui-components/table";
export default function Dashboard() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  return (
    <>
      {/* <WMTable /> */}

      {/* things to show 
      
      1) no. of users registered in last 1 month
      2) no. of items purchased
      3) amount of money made

       baaki aur kya chaiye daal do
      
      */}

      <Box
        sx={{ flexGrow: 1 }}
        style={{
          width: "100%",
          display: "flex",
          background: "linear-gradient(45deg , #0bd2de , #0083f9)",
          height: "100vh",
        }}
      >
        <Grid container spacing={3} style={{ width: "98%", marginTop: "1px" }}>
          <Grid item xs={2.5}>
            <Item style={{ background: "#1C2833", marginLeft: "10px" }}>
              <>
                <Typography className="dash">ADMIN DASHBOARD</Typography>

                <Item main="atabs" style={{ background: "#212F3D" }}>
                  <Item class="tab">
                    <Link to="/users" class="links">
                      USERS
                    </Link>
                  </Item>

                  <Item class="tab">
                    <Link to="/add-images" class="links">
                      IMAGES
                    </Link>
                  </Item>

                  <Item class="tab">
                    <Link to="/add-products" class="links">
                      PRODUCTS
                    </Link>
                  </Item>

                  <Item class="tab">
                    <Link to="/view-orders" class="links">
                      VIEW ORDERS
                    </Link>
                  </Item>

                  <Item class="tab">
                    <Link to="/get-sentiments" class="links">
                      SENTIMENTS
                    </Link>
                  </Item>

                  <Item class="tab">
                    <Link to="/get-churn" class="links">
                      CHURN
                    </Link>
                  </Item>
                </Item>
              </>
            </Item>
          </Grid>
          <Grid item xs={9}>
            <Item style={{ background: "#1C2833" }}>charts & graph</Item>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
