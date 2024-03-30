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


  return (
    <div>
        <input type="file" />
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
