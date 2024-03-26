import React, { useEffect, useState } from "react";

export default function ProductStore() {
  // call fake api and make outline of the store
  const [data, setdata] = useState([]);
  const fetchApi = async () => {
    const response = await fetch("https://fakestoreapi.com/products/");
    const result = await response.json();
    setdata(result);
  };
  useEffect(() => {
    fetchApi();
  });

  return (
    <div>
      <div className="d-flex flex-wrap justify-content-center align-items-center">
        {data.map((value, index) => {
          return (
            <div
              className="card m-3"
              style={{ width: "18rem", height: "700px" }}
            >
              {/* change height and style when real api is called */}
              <img
                className="img-fluid"
                src={value.image}
                alt="Card image cap"
              />
              <div className="card-body">
                <h5 className="card-title">{value.title}</h5>
                <p className="card-text">{value.price}</p>
                <a className="btn btn-primary">Add to Cart</a>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
