import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { IP } from "./constants";
export default function ProductInfo() {
  const location = useLocation();
  const productId = location?.state;
  const [productInfo, setProductInfo] = useState({});

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
  useEffect(() => {
    product();
  }, []);

  return (
    <div>
      <img src={productInfo?.data?.image} height={"500px"} width={"500px"} style={{objectFit:"cover"}}/>
    </div>
  );
}
