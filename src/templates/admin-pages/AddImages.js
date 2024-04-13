import React, { useEffect, useState } from "react";
import { IP } from "../constants";
import {
  Dialog,
  DialogTitle,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

function ImageDialog({ open, imageId, imageURL, onClose }) {

  const handleDeleteImage = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/admin/view/gallery/${imageId}/deleteImage`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );

      const imageDelete = await response.json();
      console.log("image deleted", imageDelete);
      // if (!userDetails?.data?.refreshToken) {
      //   navigate("/");
      // }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div style={{ textAlign: "center" }}>
        <div className="dialog-content">
          <span className="close" >
            &times;
          </span>
          <img
            src={imageURL}
            alt="Selected Image"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        </div>
        <DeleteIcon onClick={() =>handleDeleteImage()} />
      </div>
    </Dialog>
  );
}

export default function AddImages() {
  const [allImages, setAllImages] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); // State to track the selected image
  const [openDialog, setOpenDialog] = useState(false);
  const [message, setMessage] = useState('');

  const [imageURL, setImageURL] = useState();
  const images = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/gallery`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await response.json();
      setAllImages(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    images();
  }, []);

  const handleOpenImage = (imageId, imageUrl) => {
    setSelectedImage(imageId);
    setImageURL(imageUrl);
    setOpenDialog(true);
  };

  const handleCloseImage = () => {
    setSelectedImage(null); // Clear the selected image URL
    setOpenDialog(false); // Close the dialog box
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/gallery/addImage`, {
        method: 'POST',
        body: formData
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message);
      } else {
        throw new Error(data.error.message);
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };


  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {allImages?.data?.map((value, index) => {
          return (
            <div
              key={index}
              style={{
                width: "300px",
                height: "200px",
                overflow: "hidden",
                cursor: "pointer",
              }}
              onClick={() => handleOpenImage(value?._id, value?.imgurl)}
            >
              <img
                className="img-fluid"
                src={value.imgurl}
                alt="Card image cap"
                style={{
                  objectFit: "cover",
                  width: "300px",
                  height: "200px",
                }}
              />
            </div>
          );
        })}
      </div>
      {openDialog && (
        <ImageDialog
          open={openDialog}
          imageId={selectedImage}
          imageURL={imageURL}
          onClose={handleCloseImage}
        />
      )}
      <div>
      <form id="imageUploadForm" onSubmit={handleSubmit}>
        <input type="file" name="image" accept="image/*" />
        <button type="submit">Submit</button>
      </form>
      <div id="message">{message}</div>
    </div>
    </div>
  );
}
