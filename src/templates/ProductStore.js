import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogTitle, Grid, IconButton } from "@mui/material";

export default function ProductStore() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState({});
  const products = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products`,
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
  }, []);

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
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
      const data = await response.json();
      console.log("data", data);
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
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const itemDelete = await response.json();
      console.log("user deleted", itemDelete);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
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
  return (
    <>
      <div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {allProducts?.data?.map((value, index) => {
            return (
              <div
                className="card m-3"
                style={{ width: "18rem", height: "460px" }}
              >
                <img
                  className="img-fluid"
                  src={value.image}
                  alt="Card image cap"
                  style={{
                    objectFit: "cover",
                    width: "300px",
                    height: "200px",
                  }}
                  onClick={() => openProductInfo(value._id)}
                />
                <div className="card-body">
                  <h5 className="card-title">{value.name}</h5>
                  <h6 className="card-title" value={value.description}>{truncateText(value.description, 70)}</h6>
                  <p className="card-text">{value.price}</p>
                  <p className="card-text">{value.avgRating}</p>
                  {!value?.inCart ? (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={() => handleAddToCart(value?._id)}
                      >
                        Add to Cart
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        className="btn btn-primary"
                        onClick={(e) => handleRemoveFromCart(e,value?._id)}
                      >
                        Remove from Cart
                      </button>
                    </>
                  )}

                  {!value?.inWishlist ? (
                    <IconButton>
                      <FavoriteBorderIcon
                        onClick={() => handleAddToWishlist(value._id)}
                      />
                    </IconButton>
                  ) : (
                    <IconButton>
                      <Favorite
                        onClick={() => handleRemoveFromWishlist(value._id)}
                      />
                    </IconButton>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
