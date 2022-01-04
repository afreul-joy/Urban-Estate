import React, { useState } from "react";
import { Container } from "react-bootstrap";
import "./GivReview.css"

const GiveReview = () => {
  const [topicName, setTopicName] = useState();
  const [reviewerName, setReviewerName] = useState();
  const [rating, setRating] = useState();
  const [comment, setComment] = useState();

  const handleTopicName = (e) => {
    setTopicName(e.target.value);
  };

  const handleRating = (e) => {
    setRating(e.target.value);
  };

  const handleComment = (e) => {
    setComment(e.target.value);
  };
  const handleReviewerName = (e) => {
    setReviewerName(e.target.value);
  };
  const handleReview = (e) => {
    e.preventDefault();
    const data = { reviewerName, topicName, rating, comment };

    fetch("https://young-anchorage-08482.herokuapp.com/customerReview", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Review Added");
        }
      });
  };

  return (
    <div>
          <div className="review">
                <div className="">
                  <h2 className="text-center">
                    Review our service
                  </h2>
                  <hr />
                  <div className="email-from">
                    <form onSubmit={handleReview} >
                      <div className="row pt-5 mx-auto">
                        <div className="col-8 from-group mx-auto">
                          <input
                            type="text"
                            className="from-control p-1 input-box"
                            placeholder="Name"
                            name="name"
                            required="true"
                            onChange={handleReviewerName}
                          />
                        </div>
                        <div className="col-8 from-group pt-2  mx-auto ">
                          <input
                            type="text"
                            className="p-1 from-control input-box"
                            placeholder="Topic Name"
                            name=""
                            required="true"
                            onChange={handleTopicName}
                          />
                        </div>
                        <div className="col-8 from-group pt-2 mx-auto ">
                          <input
                            type="text"
                            className="from-control input-box p-2"
                            placeholder="Rating"
                            name="Rating"
                            required="true"
                            onChange={handleRating}
                          />
                        </div>
                        <div className="col-8 from-group pt-2 mx-auto">
                          <textarea
                            className="from-control p-2"
                            placeholder="Your Comment"
                            name="message"
                            cols="30"
                            rows="10"
                            required="true"
                            onChange={handleComment}
                          ></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto ">
                          <input
                            type="submit"
                            className="ps-5 pe-5 submit-btn"
                            value="Send"
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
          </div>     
    </div>
  );
};

export default GiveReview;
