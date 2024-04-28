import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function RecommendationPage() {
  const navigate = useNavigate();
  const [bmiRecommendation, setBmiRecommendation] = useState({});
  const [goalGenderRecommendation, setGoalGenderRecommendation] = useState({});
  const [productGoalRecommendation, setProductGoalRecommendation] = useState(
    {}
  );
  const [prevPurchaseRecommendation, setPrevPurchaseRecommendation] = useState(
    {}
  );
  const [recentlyViewRecommendation, setRecentlyViewRecommendation] = useState(
    {}
  );
  const [top5Recommendation, setTop5Recommendation] = useState({});
  const [timelineRecommendation, setTimelineRecommendation] = useState({});
  const [prevSearchRecommendation, setPrevSearchRecommendation] = useState({});
  const [exerciseRecommendation, setExerciseRecommendation] = useState({});
  const [render, setRender] = useState(false);
  const ageHeightWeight = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/ageHeightWeight`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setBmiRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const goalGender = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/goalGender`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setGoalGenderRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const productGoal = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/goals`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setProductGoalRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const prevPurchase = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevPurchase`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setPrevPurchaseRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const prevSearch = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevSearch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setPrevSearchRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const recentlyViewed = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/prevView`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setRecentlyViewRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const getByTime = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/getByTime`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setTimelineRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const exercises = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/exercise/recommendation`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          // body: JSON.stringify(details),
          credentials: "include",
        }
      );
      const data = await response.json();
      setExerciseRecommendation(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const truncateText = (text, maxLength) => {
    if (!text) return "";
    if (text.length <= maxLength) {
      return text;
    }
    return text.substring(0, maxLength) + "...";
  };

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          getByTime(),
          recentlyViewed(),
          prevSearch(),
          prevPurchase(),
          productGoal(),
          ageHeightWeight(),
          goalGender(),
          exercises(),
        ]);
        setRender(true);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!render) {
    return (
      <>
        <p>Your recommendations are Loading</p>
      </>
    );
  }

  return (
    <>
      <br></br>
      {goalGenderRecommendation?.data && (
        <>
          <h3>Goal Gender</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {goalGenderRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
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
                      <h6 className="card-title" value={value.description}>
                        {truncateText(value.description, 70)}
                      </h6>
                      <p className="card-text">{value.price}</p>
                      <p className="card-text">{value.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {bmiRecommendation?.data && (
        <>
          <h3>Age Height Weight</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {bmiRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
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
                      <h6 className="card-title" value={value.description}>
                        {truncateText(value.description, 70)}
                      </h6>
                      <p className="card-text">{value.price}</p>
                      <p className="card-text">{value.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {productGoalRecommendation?.data && (
        <>
          <h3>Product goal</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {productGoalRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
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
                      <h6 className="card-title" value={value.description}>
                        {truncateText(value.description, 70)}
                      </h6>
                      <p className="card-text">{value.price}</p>
                      <p className="card-text">{value.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {prevPurchaseRecommendation?.data && (
        <>
          <h3>prev purchase</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {prevPurchaseRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <img
                      className="img-fluid"
                      src={value.product.image}
                      alt="Card image cap"
                      style={{
                        objectFit: "cover",
                        width: "300px",
                        height: "200px",
                      }}
                      onClick={() => openProductInfo(value.product._id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.product.name}</h5>
                      <h6
                        className="card-title"
                        value={value.product.description}
                      >
                        {truncateText(value.product.description, 70)}
                      </h6>
                      <p className="card-text">{value.product.price}</p>
                      <p className="card-text">{value.product.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {prevSearchRecommendation?.data && (
        <>
          <h3>prev search</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {prevSearchRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <img
                      className="img-fluid"
                      src={value.product.image}
                      alt="Card image cap"
                      style={{
                        objectFit: "cover",
                        width: "300px",
                        height: "200px",
                      }}
                      onClick={() => openProductInfo(value.product._id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.product.name}</h5>
                      <h6
                        className="card-title"
                        value={value.product.description}
                      >
                        {truncateText(value.product.description, 70)}
                      </h6>
                      <p className="card-text">{value.product.price}</p>
                      <p className="card-text">{value.product.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {recentlyViewRecommendation?.data && (
        <>
          <h3>recently viewed</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {recentlyViewRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
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
                      onClick={() => openProductInfo(value.product._id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.product.name}</h5>
                      <h6
                        className="card-title"
                        value={value.product.description}
                      >
                        {truncateText(value.product.description, 70)}
                      </h6>
                      <p className="card-text">{value.product.price}</p>
                      <p className="card-text">{value.product.avgRating}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      <br></br>
      {timelineRecommendation?.data && (
        <>
          <h3>timeline</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {timelineRecommendation?.data?.lastMonth?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
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
                      {/* <h6 className="card-title" value={value.description}>
                        {truncateText(value.description, 70)}
                      </h6> */}
                      <p className="card-text">{value.price}</p>
                      {/* <p className="card-text">{value.avgRating}</p> */}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
      {exerciseRecommendation?.data && (
        <>
          <h3>Exercises for you</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {exerciseRecommendation?.data?.map((value, index) => {
              if (!value) return null;
              return (
                <>
                  <div
                    className="card m-3"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <img
                      className="img-fluid"
                      src={value.exerciseGif}
                      alt="Card image cap"
                      style={{
                        objectFit: "cover",
                        width: "300px",
                        height: "300px",
                      }}
                      // onClick={() => openProductInfo(value._id)}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{value.name}</h5>
                      {/* <h6 className="card-title" value={value.description}>
                        {truncateText(value.description, 70)}
                      </h6> */}
                      {/* <p className="card-text">{value.price}</p> */}
                      {/* <p className="card-text">{value.avgRating}</p> */}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
