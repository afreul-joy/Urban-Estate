import React from "react";
import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import "./Reviews.css";

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    fetch("https://urban-estate-server.onrender.com/customerReview")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#E3E6E8",
        paddingTop: "20px",
        paddingBottom: "30px",
        marginTop: "10px",
      }}
    >
      <Container>
        <h3 className="mb-4 mt-3">User's Reviews</h3>
        <div className="d-flex container justify-content-center user-review">
          {reviews.map((review, i) => (
            <div key={i}>
              <div
                className="card text-dangerdark mb-2 ms-3 review-bg"
                style={{ width: "18rem", height: "200px" }}
              >
                <div className="card-header">{review.reviewerName}</div>

                <div className="card-body review-text">
                  <h5 className="card-title">
                    {review.topicName}{" "}
                    <span className="bg-dark text-warning rounded p-2">
                      ★ {review.rating}
                    </span>
                  </h5>

                  <p className="card-text mt-3">{review.comment}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
