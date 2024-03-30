import React, { useEffect, useState } from 'react'
import { IP } from '../constants';

export default function AddImages() {
  //http://localhost:5000/api/admin/view/gallery
  const [allImages, setAllImages] = useState({});
  const images = async () => {
    try {
      const response = await fetch(`http://${IP}:5000/api/admin/view/gallery`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify(details),
        credentials: "include",
      });

      const data = await response.json();
      console.log("images",data);
      setAllImages(data)
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(()=>{
    images();
  },[])

  const [selectedFile, setSelectedFile] = useState(null);
  const [localPath, setLocalPath] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setLocalPath(URL.createObjectURL(file));
  };
console.log("selectedFile",localPath)
  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        throw new Error('No file selected');
      }

      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('http://${IP}:5000/api/admin/view/gallery/addImage', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const data = await response.json();
      console.log('Upload successful:', data);
      // Handle success, update UI, etc.
    } catch (error) {
      console.error('Error uploading image:', error.message);
      // Handle error, display error message, etc.
    }
  };

  return (
    <div>
        <input type="file" onChange={handleFileChange}/>
        <input type="submit" onSubmit={handleUpload} />
        <div className="d-flex flex-wrap justify-content-center align-items-center">
        {allImages?.data?.map((value, index) => {
          return (
            <div
              style={{ width: "300px", height: "200px", overflow:"hidden" }}
            >
              <img
                className="img-fluid"
                src={value.imgurl}
                alt="Card image cap"
                style={{objectFit:'contain', width:"300px", height:"200px"}}
              />
            </div>
          );
        })}
      </div>
    </div>
  )
}
