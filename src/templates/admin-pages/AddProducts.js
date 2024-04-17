import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";

function AddProductDialog(props) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [stock, setStock] = useState("");
  const [weight, setWeight] = useState("");
  const [productGoal, setProductGoal] = useState("");
  const [category, setCategory] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // State for selected image data

  const handleSubmit = async(e) => {
    e.preventDefault();
    
    // Create FormData object
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("weight", weight);
    formData.append("productGoal", productGoal);
    formData.append("category", category);
    formData.append("image", selectedImage); // Append selected image data

    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/products/addProducts`, {
        method: "POST",
        body: formData,
        credentials: "include", 
      });

      if (!response.ok) {
        throw new Error("Failed to Add product");
      }

      const data = await response.json();
      console.log("data", data);
      // navigate("/home");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Dialog open={props?.open} onClose={props?.onClose}>
        <DialogTitle>Add Product</DialogTitle>
        <form onSubmit={handleSubmit}>
          <TextField
            placeholder="Enter Product Name"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            placeholder="Enter Product price"
            id="price"
            name="price"
            onChange={(e) => setPrice(e.target.value)}
          />
          <TextField
            placeholder="Enter Product Description"
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
          />
          <TextField
            placeholder="Enter Product stock"
            id="stock"
            name="stock"
            onChange={(e) => setStock(e.target.value)}
          />
          <TextField
            placeholder="Enter Product Weight"
            id="weight"
            name="weight"
            onChange={(e) => setWeight(e.target.value)}
          />
          <InputLabel>Product Goal</InputLabel>
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
          <InputLabel>Product Category</InputLabel>
          <RadioGroup
            aria-label="category"
            name="category"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <FormControlLabel value="Eatables" control={<Radio />} label="Eatables" />
            <FormControlLabel value="Equipments" control={<Radio />} label="Equipments" />
            <FormControlLabel value="Accessories" control={<Radio />} label="Accessories" />
          </RadioGroup>
          <input type="file" name="image" accept="image/*" onChange={(e) => setSelectedImage(e.target.files[0])} />
          <input type="submit" value="Add Product"/>
        </form>
      </Dialog>
    </>
  );
}

export default function AddProducts() {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [pageNo, setPageNo] = useState(1);

  const products = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/products?page=${pageNo}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await response.json();
      setAllProducts(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    products();
  }, [pageNo]);

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const handleClose = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleNextPage = () => {
    if (pageNo < 2) {
      setPageNo(pageNo + 1);
    }
  };
  const handlePrevPage = () => {
    if (pageNo > 1) {
      setPageNo(pageNo - 1);
    }
  };
  return (
    <>
      <div>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {allProducts?.data?.map((value, index) => {
            return (
              <div
                className="card m-3"
                style={{ width: "18rem", height: "430px" }}
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
                  <h6 className="card-title">
                    {truncateText(value.description, 100)}
                  </h6>
                  <p className="card-text">{value.price}</p>
                  <p className="card-text">{value.avgRating}</p>
                </div>
              </div>
            );
          })}
        </div>
        <button onClick={() => handleOpenDialog()}>Add Products</button>
      </div>
      <div>
        <button onClick={() => handlePrevPage()}>Prev</button> {pageNo}{" "}
        <button onClick={() => handleNextPage()}>Next</button>
      </div>
      <AddProductDialog open={openDialog} onClose={handleClose} />
    </>
  );
}
