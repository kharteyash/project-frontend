import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP } from "./constants";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Dialog, DialogTitle, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';

function ReviewDialog(props) {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();
  const handleSubmitReview = async () => {
    const formData = {
      comment,
      rating,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${props?.productId}/reviews/add`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Dialog open={props?.open} onClose={props?.onClose}>
        <DialogTitle>Add Review</DialogTitle>
        <TextField
          placeholder="Add Comment"
          id="comment"
          name="comment"
          fullWidth
          onChange={(e) => setComment(e.target.value)}
        />
        <TextField
          placeholder="Add Rating (1-5)"
          id="rating"
          name="rating"
          fullWidth
          onChange={(e) => setRating(e.target.value)}
        />
        <button onClick={() => handleSubmitReview()}>Submit</button>
      </Dialog>
    </div>
  );
}

export default function ProductInfo() {
  const location = useLocation();
  const productId = location?.state;
  const [productInfo, setProductInfo] = useState({});
  const [reviews, setReviews] = useState({});
  const [seeReview, setSeeReview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const product = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setProductInfo(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const review = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/reviews`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      setReviews(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    product();
    review();
  }, []);

  const handleAddToCart = async () => {
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
    } catch (error) {
      console.error("Error:", error);
    }
    product();
  };

  const handleDeleteReview = async (reviewId) => {

    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/${productId}/reviews/${reviewId}/delete`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
    } catch (error) {
      console.error("Error:", error);
    }
    review();
    product();
  };
  console.log(productInfo);
  // console.log("reviews",review)

  const handleReviews = () => {
    setSeeReview(!seeReview);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  
  const handleClose = () => {
    setOpenDialog(false)
  }

  return (
    <>
      <div>
        <img
          src={productInfo?.data?.product?.image}
          height={"500px"}
          width={"500px"}
          style={{ objectFit: "cover" }}
        />

        <div>
          <h1>{productInfo?.data?.product?.name}</h1>

          <h3>{productInfo?.data?.product?.description}</h3>
          <h2>{productInfo?.data?.product?.price}</h2>
          <p>
            {productInfo?.data?.product?.avgRating} / 5 <StarIcon /> (
            {reviews?.data?.length})
          </p>

          <button onClick={() => handleAddToCart()}>Add to cart</button>
        </div>
        <button onClick={() => handleReviews()}>
          {!seeReview ? "See All Reviews" : "Hide Reviews"}
        </button>
        <button onClick={() => handleOpenDialog()}>Add Review</button>
        {seeReview ? (
          <div>
            <h3>Reviews</h3>
            {reviews?.data?.map((value, index) => {
              return (
                <>
                  <Typography>
                    {value?.firstName} {value?.lastName} : {value?.comment} |
                    Rating : {value?.rating}
                  </Typography>
                  <IconButton>
                    <DeleteIcon onClick={() => handleDeleteReview(value?.reveiwId)}/>
                  </IconButton>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <ReviewDialog open={openDialog} productId={productId} onClose={handleClose}/>
    </>
  );
}
