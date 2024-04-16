import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP } from "./constants";
import "../templates/css/Product.css";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Dialog, DialogTitle, TextField, IconButton } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function ReviewDialog(props) {
  const [comment, setComment] = useState();
  const [rating, setRating] = useState();
  const onClose = props?.onClose;
  const review = props?.review;

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
      onClose();
      review();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Dialog open={props?.open} onClose={onClose}>
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
    <main class="products">
    <div class="prod-cont" >
    <div class="product_wrapper">
      <div class="left-column">
        <img
          src={productInfo?.data?.product?.image}
          height={"500px"}
          width={"500px"}
          style={{ objectFit: "cover" }}
          class="m-active"
        />
        <div class="img-small">
        <img src={productInfo?.data?.product?.image}  class="active"/>
        </div>
      </div>
        <div class="prod_content" >
        <div class="prod_description">
        <span> <p class="category">{productInfo?.data?.product?.category}</p></span>
          <h1>{productInfo?.data?.product?.name}</h1>
          <br></br>
          <p class="prod_desc">{productInfo?.data?.product?.description}</p>
         
          <p>
            {productInfo?.data?.product?.avgRating} / 5 <StarIcon style={{ color:"#FFC300" }}/> (
            {reviews?.data?.length})
          </p>
         
          <h2 class="price"><span>&#8360; {productInfo?.data?.product?.price}</span>
          <button onClick={() => handleAddToCart()} class="add_cart">Add to cart</button></h2>

          </div>{/*prod description ends */}

      <div class="reviews">
        <button onClick={() => handleReviews()} class="sa-reviews">
          {!seeReview ? "See All Reviews" : "Hide Reviews"}
        </button>
        <button onClick={() => handleOpenDialog()} class="a-reviews">Add Review</button>
        {seeReview ? (
          <div class="r-text">
            <h3>Reviews</h3>
            
            {reviews?.data?.map((value, index) => {
              return (
                <>
                 <TableContainer component={Paper}>
                <Table sx={{ minWidth: 100 }} aria-label="simple table">
                <TableRow>
                <TableCell sx={{ maxWidth: 100 }}>
                <Typography>
                   {value?.firstName} {value?.lastName}: Rating : {value?.rating} | {value?.comment}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <IconButton >
                    <DeleteIcon onClick={() => handleDeleteReview(value?.reveiwId)} />
                  </IconButton>
                  </TableCell>
                  </TableRow>
                  </Table>
                  </TableContainer>
                  
                </>
               
              );
            })}
          </div>
        ) : (
          <></>
        )}
     
     <ReviewDialog open={openDialog} productId={productId} onClose={handleClose} review={review}/>
      </div>{/*review ends*/}
      </div>{/* prod content ends*/}

      </div>{/* prod-wrapper ends */}
      </div>{/*   prod-cont ends */}
      </main>
    </>
  );
}