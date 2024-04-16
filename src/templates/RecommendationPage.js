import React, { useEffect, useState } from "react";
import { IP } from "./constants";
import { useNavigate } from "react-router";
import { Button } from "@mui/material";

export default function RecommendationPage() {
  const navigate = useNavigate();
  const [bmiRecommendation, setBmiRecommendation] = useState({});
  const [goalGenderRecommendation, setGoalGenderRecommendation] = useState({});
  const [cityCountryRecommendation, setCityCountryRecommendation] = useState(
    {}
  );
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

  const [viewTop5, setViewTop5] = useState(false);
  const [viewgg, setViewgg] = useState(false);
  const [viewahw, setViewahw] = useState(false);
  const [viewcc, setViewcc] = useState(false);
  const [viewpp, setViewpp] = useState(false);
  const [viewpg, setViewpg] = useState(false);
  const [viewps, setViewps] = useState(false);
  const [viewrv, setViewrv] = useState(false);
  const [viewtime, setViewtime] = useState(false);
  const [viewexercise, setViewexercise] = useState(false);

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

  const cityCountry = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/cityCountry`,
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
      setCityCountryRecommendation(data);
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

  const top5Purchase = async () => {
    try {
      const response = await fetch(
        `http://${IP}:5000/api/users/view/products/recommendation/top5Purchase`,
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
      setTop5Recommendation(data);
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
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + "...";
  };

  const openProductInfo = (productId) => {
    if (productId) {
      navigate(`product/${productId}`, { state: productId });
    } else {
      console.error("Product name is empty or invalid.");
    }
  };

  useEffect(() => {
    // exercises();
  }, []);

  const showTop5 = () => {
    if (!viewTop5) {
      top5Purchase();
    }
    setViewTop5(!viewTop5);
  };
  const showgg = () => {
    if (!viewgg) {
      goalGender();
    }
    setViewgg(!viewgg);
  };
  const showahw = () => {
    if (!viewahw) {
      ageHeightWeight();
    }
    setViewahw(!viewahw);
  };
  const showcc = () => {
    if (!viewcc) {
      cityCountry();
    }
    setViewcc(!viewcc);
  };
  const showpg = () => {
    if (!viewpg) {
      productGoal();
    }
    setViewpg(!viewpg);
  };
  const showpp = () => {
    if (!viewpp) {
      prevPurchase();
    }
    setViewpp(!viewpp);
  };
  const showps = () => {
    if (!showps) {
      prevSearch();
    }
    setViewps(!viewps);
  };
  const showrv = () => {
    if (!viewrv) {
      recentlyViewed();
    }
    setViewrv(!viewrv);
  };
  const showtime = () => {
    if (!viewtime) {
      getByTime();
    }
    setViewtime(!viewtime);
  };

  return (
    <>
      <br></br>
      <button onClick={() => showTop5()}>show top 5</button>
      {viewTop5 && top5Recommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {top5Recommendation?.data?.map((value, index) => {
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
      <button onClick={() => showgg()}>show top gender and goal based</button>
      {viewgg && goalGenderRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {goalGenderRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showahw()}>show top products by bmi</button>
      {viewahw && bmiRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {bmiRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showcc()}>
        show top products by city and country
      </button>
      {viewcc && cityCountryRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {cityCountryRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showpg()}>show top by product goals</button>
      {viewpg && productGoalRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {productGoalRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showpp()}>show previous purchases</button>
      {viewpp && prevPurchaseRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {prevPurchaseRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showps()}>show previously searched</button>
      {viewps && prevSearchRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {prevSearchRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showrv()}>show recently viewed</button>
      {viewrv && prevSearchRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {prevSearchRecommendation?.data?.map((value, index) => {
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
      <button onClick={() => showtime()}>show timeline</button>
      {viewtime && timelineRecommendation?.data && (
        <>
          <h3>Top 5 products in our store</h3>
          <div className="d-flex flex-wrap justify-content-center align-items-center">
            {timelineRecommendation?.data?.lastMonth?.map((value, index) => {
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
    </>
  );
}
