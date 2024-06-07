"use client";
import Navbar from "../../../components/Navbar";
import { Box, Button, Rating, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

const BreweryInfo = ({ params }) => {
  const id = params.id;
  const [breweryData, setBreweryData] = useState({});
  const [value, setValue] = useState(0);
  const [hover, setHover] = useState(-1);
  const [description, setDescription] = useState("");
  const [reviews, setReviews] = useState(null);
  const [averageRating, setAverageRating] = useState(null);
  function getLabelText(value) {
    return `${value}`;
  }
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) {
      return null;
    }

    const totalRating = reviews.reduce(
      (total, review) => total + review.rating,
      0
    );
    return totalRating / reviews.length;
  };

  useEffect(() => {
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries/${id}`)
      .then((response) => {
        setBreweryData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);
  useEffect(() => {
    axios
      .get("/api/reviews/getreviews", {
        data: {
          brewery: id,
        },
      })
      .then((response) => {
        setReviews(response.data);
        const filteredReviews = response.data.data.filter(
          (review) => review.brewery === id
        );
        const avgRating = calculateAverageRating(filteredReviews);
        setAverageRating(avgRating);
      })
      .catch((error) => {
        console.error("Error fetching data 🔴:", error);
      });
  }, [id]);
  const handleReviewSubmit = async () => {
    try {
      const response = await axios.post("/api/reviews/postreview", {
        brewery: id,
        rating: value,
        description: description,
      });

      setValue(0);
      setDescription("");
      window.location.reload();
    } catch (error) {
      console.error("Review submission failed, Please try again !", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-auto bg-yellow-50 min-h-screen">
        <div className="my-3 w-3/4">
          <h1 className="text-3xl text-left font-bold text-slate-900 font-serif">
            {breweryData.name}
          </h1>
          <div className=" flex items-left justify-around mt-4 ">
            <div>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">Brewery Type: </span>
                {breweryData.brewery_type}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold ">Address: </span>{" "}
                {breweryData.address_1}
                {breweryData.address_2 !== null && ` ${breweryData.address_2}`}
                {breweryData.address_3 !== null && ` ${breweryData.address_3}`}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">City: </span> {breweryData.city}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">State: </span> {breweryData.state}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">State Province: </span>{" "}
                {breweryData.state_province}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">Postal Code: </span>{" "}
                {breweryData.postal_code}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">Street: </span> {breweryData.street}
              </p>

              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">Latitude: </span>{" "}
                {breweryData.latitude}
              </p>
            </div>
            <div>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold">Phone: </span> {breweryData.phone}
              </p>
              <p className="mb-2 text-lg text-slate-900">
                <span className="font-bold ">Website: </span>
                <a
                  href={breweryData.website_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:underline hover:text-red-600"
                >
                  {breweryData.website_url}
                </a>
              </p>

              <p className="mb-3 text-lg  text-slate-900">
                <span className="mb-3 text-lg font-bold text-slate-900">
                  Average Rating:{" "}
                </span>
                {averageRating !== null
                  ? averageRating.toFixed(1)
                  : "No reviews yet"}
              </p>
              <p className="mt-2 text-lg text-slate-900">
                <span className="font-bold">Longitude: </span>{" "}
                {breweryData.longitude}
              </p>
            </div>
          </div>
        </div>

        <div className="my-4 w-3/4 ">
          <div className=" rounded p-4 mt-4 bg-slate-300 border-5 border-emerald-50">
            <h1 className="text-2xl font-bold font-calibri text-slate-900 ">
              Add your comment.
            </h1>
            <TextField
              id="outlined-multiline-static"
              multiline
              rows={3}
              placeholder="Enter Review"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-1 rounded border text-slate-900"
            />
            <div className="flex items-center my-2 font-calibri text-xl font-bold text-slate-900">
              <p>How much do you rate?</p>
              <Rating
                value={value}
                precision={1}
                getLabelText={getLabelText}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
            </div>
            <Button
              variant="contained"
              onClick={handleReviewSubmit}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-red-600"
            >
              Submit
            </Button>
            {/* <div className="bg-gray-300 rounded p-4 mt-4">
              <h2
                className="text-xl font-bold"
                style={{
                  marginBottom: "0.5rem",
                }}
              >
                Comments
              </h2>
              <hr style={{ width: "100%", marginBottom: "1rem" }} />
              {reviews?.data && (
                <ul>
                  {reviews?.data.map((review) => {
                    if (review.brewery === id) {
                      return (
                        <li key={review._id} className="mb-4">
                          <div className="flex">
                            <p className="text-lg font-semibold mr-2">
                              {review.username}
                            </p>
                            <Rating disabled value={review.rating} />
                          </div>
                          <p
                            className="text-lg mb-4"
                            style={{ fontFamily: "calibri" }}
                          >
                            Feedback: {review.description}
                          </p>
                        </li>
                      );
                    }
                    return null;
                  })}
                </ul>
              )}
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default BreweryInfo;
