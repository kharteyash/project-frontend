import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import "../templates/css/Store.css";
import StarIcon from "@mui/icons-material/Star";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  TextField,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function ProductStore() {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  const [allProducts, setAllProducts] = useState({});
  const [searchItem, setSearchItem] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const details = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/users/get-details`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setUserDetails(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const products = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products?page=${pageNo}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSearchItem = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/search?name=${searchItem}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    products();
  }, [searchItem, pageNo]);

  useEffect(()=>{
    details();
  },[])

  const openProductInfo = (value) => {
    const productId = value?._id;
    console.log("productId",productId)
    if (productId) {
      navigate(`product/${productId}`, { state: { productId, value } });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  const handleAddToCart = async (productId) => {
    console.log("productId", productId);
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/addToCart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const handleAddToWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/addToWishlist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log("data", data);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/wishlist/${productId}/removeItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const removeFromWishlist = await response.json();
      toast.success(removeFromWishlist?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };

  const handleRemoveFromCart = async (event, data) => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/cart/${data}/deleteItem`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const itemDelete = await response.json();
      toast.success(itemDelete?.message);
    } catch (error) {
      console.error("Error:", error);
    }
    products();
  };
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleNextPage = () => {
    setPageNo(pageNo + 1);
  };
  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };

  return (

    
    
    <>
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
      
      <div>
      <>
    <div class="text-center" >
       <div id="cover">
          <div class="tb">

          <div class="td"><input type="text"
          onChange={(e) => setSearchItem(e.target.value)}
          style={{
          borderRadius: "10px",border:"none" }}
          placeholder="Search"/></div>

          <div class="td" id="s-cover"><button onClick={() => handleSearchItem()}>
            <div id="s-circle"></div>
            <span id="ns"></span>
          </button></div>
    
     
          </div>{/tb ends/ }
       </div>{/* cover ends*/}
    </div>{/text centerends/}
    </>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {allProducts?.data?.map((value, index) => {
            return (
              <div
                className="card m-3"
                style={{
                  width: "18rem",
                  height: "490px",
                  boxShadow: " 0px 9px 30px -15px rgb(0 0 0)",
                  borderRadius: "20px",
                  marginTop: "20px",
                  border: "1px solid lightgrey",
                  
                }}
              >
                <img
                  className="img-fluid"
                  src={value.image}
                  alt="Card image cap"
                  style={{
                    objectFit: "cover",
                    width: "100%",
                    height: "200px",
                    borderRadius: "20px 20px 0px 0px",
                  }}
                  onClick={() => openProductInfo(value._id)}
                />
                <div className="card-body">
                  {!value?.inWishlist ? (
                    <IconButton
                      style={{ position: "absolute", top: "0", right: "0" }}
                    >
                      <FavoriteBorderIcon
                        onClick={() => handleAddToWishlist(value._id)}
                      />
                    </IconButton>
                  ) : (
                    <IconButton
                      style={{ position: "absolute", top: "0", right: "0" }}
                    >
                      <Favorite
                        onClick={() => handleRemoveFromWishlist(value._id)}
                        style={{ color: "#F43E29" }}
                      />
                    </IconButton>
                  )}
                  <h5 className="card-title">{value.name}</h5>
                  <p className="card-title" value={value.description} style={{height:"60px"}}>
                    {truncateText(value.description, 70)}
                  </p>
                  <h6 className="card-text">&#8360; {value.price}</h6>
                  <p className="card-text">
                    {value.avgRating} / 5{" "}
                    <StarIcon style={{ color: "#FFC300" }} />
                  </p>
                  {!value?.inCart ? (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(value?._id)}
                        style={{
                          background:
                            "linear-gradient(45deg , #0bd2de , #0083f9)",
                            border:"none",
                            boxShadow:"0px",
                            boxShadow: " 0px 9px 30px -15px rgb(0 0 0)"
                        }}
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleRemoveFromCart(e, value?._id)}
                        style={{
                          background:
                            "linear-gradient(45deg , #0bd2de , #0083f9)",
                            border:"none",
                            boxShadow: " 0px 9px 30px -15px rgb(0 0 0)"
                        }}
                      >
                        Remove from Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <button id="pg-btn" onClick={() => handlePrevPage()}>Prev</button> {pageNo}{" "}
        <button id="pg-btn" onClick={() => handleNextPage()}>Next</button>
      </div>
    </>
  );
}