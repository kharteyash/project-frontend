import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IP } from "../constants";
import StarIcon from "@mui/icons-material/Star";
import {
  Dialog,
  DialogTitle,
  TextField,
  IconButton,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DeleteIcon from "@mui/icons-material/Delete";

function EditDetailsDialog(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [productGoal, setProductGoal] = useState("");
  const productId = props?.productDetails?._id;
  useEffect(() => {
    setName(props?.productDetails?.name);
    setDescription(props?.productDetails?.description);
    setPrice(props?.productDetails?.price);
    setWeight(props?.productDetails?.weight);
    setStock(props?.productDetails?.stock);
    setCategory(props?.productDetails?.category);
    setProductGoal(props?.productDetails?.productGoal);
  }, [props?.productDetails]);

  const handleUpdateDetails = async () => {
    const formData = {
      name,
      description,
      price,
      weight,
      stock,
      category,
      productGoal,
    };
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/products/${productId}/update/details`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
          credentials: "include",
        }
      );
      const updateDetails = await response.json();
      toast.success(updateDetails?.message);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      {/* <Grid container xs={12} lg={12} md={12}> */}
      <Dialog
        open={props?.open}
        onClose={props?.onClose}
        PaperProps={{ style: { width: "90vw" } }}
      >
        <DialogTitle>Edit Details</DialogTitle>
        <p>Product Name : </p>
        <TextField
          defaultValue={props?.productDetails?.name}
          fullWidth
          onChange={(e) => setName(e.target.value)}
        />
        <p>Product Description : </p>
        <TextField
          multiline
          rows={6}
          defaultValue={props?.productDetails?.description}
          fullWidth
          onChange={(e) => setDescription(e.target.value)}
        />
        <p>Product Price : </p>
        <TextField
          defaultValue={props?.productDetails?.price}
          fullWidth
          onChange={(e) => setPrice(e.target.value)}
        />
        <p>Product Stock : </p>
        <TextField
          defaultValue={props?.productDetails?.stock}
          fullWidth
          onChange={(e) => setStock(e.target.value)}
        />
        <p>Product Weight : </p>
        <TextField
          defaultValue={props?.productDetails?.weight}
          fullWidth
          onChange={(e) => setWeight(e.target.value)}
        />
        <p>Product Goal : </p>
        <RadioGroup
          aria-label="productGoal"
          name="productGoal"
          id="productGoal"
          onChange={(e) => setProductGoal(e.target.value)}
        >
          <FormControlLabel value="bulk" control={<Radio />} label="bulk" />
          <FormControlLabel value="cut" control={<Radio />} label="cut" />
          <FormControlLabel value="lean" control={<Radio />} label="lean" />
        </RadioGroup>
        <p>Product Category : </p>
        <RadioGroup
          aria-label="category"
          name="category"
          id="category"
          onChange={(e) => setCategory(e.target.value)}
        >
          <FormControlLabel
            value="Eatables"
            control={<Radio />}
            label="Eatables"
          />
          <FormControlLabel
            value="Equipment"
            control={<Radio />}
            label="Equiment"
          />
          <FormControlLabel
            value="Accessories"
            control={<Radio />}
            label="Accessories"
          />
        </RadioGroup>
        <input
          type="submit"
          value="Update Details"
          onClick={() => handleUpdateDetails()}
        />
      </Dialog>
      {/* </Grid> */}
    </>
  );
}

function DeleteProduct(props) {
  const navigate = useNavigate();
  const productId = props?.productId;
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/products/${productId}/deleteProduct`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const productDelete = await response.json();
      navigate("/add-products");
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={props?.open} onClose={props?.onClose}>
        <DialogTitle>Are you sure you want to delete</DialogTitle>
        <button onClick={() => handleDeleteProduct()}>Yes</button>
        <button onClick={props?.onClose}>No</button>
      </Dialog>
    </>
  );
}

export default function ProductEdit() {
  const location = useLocation();
  const productId = location?.state;
  const [productInfo, setProductInfo] = useState({});
  const [reviews, setReviews] = useState({});
  const [seeReview, setSeeReview] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const product = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/products/${productId}`,
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
      const deleteReview = await response.json();
      toast.success(deleteReview?.message);
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
    setOpenDialog(false);
  };
  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleEditDetails = () => {
    setOpenDialog(true);
  };
  const handleDeleteDetails = () => {
    setOpenDeleteDialog(true);
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
        <button onClick={() => handleEditDetails()}>Edit Details</button>
        <button onClick={() => handleDeleteDetails()}>Delete Product</button>
        <br></br>
        <img
          src={productInfo?.data?.image}
          height={"500px"}
          width={"500px"}
          style={{ objectFit: "cover" }}
        />

        <div>
          <h1>{productInfo?.data?.name}</h1>

          <h3>{productInfo?.data?.description}</h3>
          <h2>{productInfo?.data?.price}</h2>
          <p>
            {productInfo?.data?.avgRating} / 5 <StarIcon /> (
            {reviews?.data?.length})
          </p>
        </div>
        <button onClick={() => handleReviews()}>
          {!seeReview ? "See All Reviews" : "Hide Reviews"}
        </button>
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
                    <DeleteIcon
                      onClick={() => handleDeleteReview(value?.reveiwId)}
                    />
                  </IconButton>
                </>
              );
            })}
          </div>
        ) : (
          <></>
        )}
      </div>
      <EditDetailsDialog
        open={openDialog}
        onClose={handleClose}
        productDetails={productInfo?.data}
      />
      <DeleteProduct
        open={openDeleteDialog}
        onClose={handleCloseDeleteDialog}
        productId={productInfo?.data?._id}
      />
    </>
  );
}
