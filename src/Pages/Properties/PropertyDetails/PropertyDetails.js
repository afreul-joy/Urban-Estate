import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Container } from "react-bootstrap";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { _id } = useParams();
  const [details, setDetails] = useState({});
  useEffect(() => {
    fetch(`https://urban-estate-server.onrender.com/property/${_id}`)
      .then((res) => res.json())
      .then((json) => setDetails(json));
  }, [_id]);
  return (
    <>
      <Container>
        <div className="property-details-card my-3">
          <div className="text">
            <img className="rounded" src={details.img} alt="" />
            <h3 className="fw-bold mt-2" style={{ color: "black" }}>
              {details.name}
            </h3>
            <p className="text-primary">
              <span className="fw-bold">Price: </span> {details.price}
            </p>
            <p style={{ color: "black" }}>
              <span className="fw-bold">Location: </span> {details.location}
            </p>
            <p style={{ color: "black" }}>
              <span className="fw-bold">Description: </span>
              {details.des}
            </p>
            <p style={{ color: "black" }}>{details.bed} Beds are avilable.</p>
            <p style={{ color: "black" }}>
              <span className="fw-bold">Space: </span>
              {details.space}
            </p>
            <button className="btn btn-primary">
              <Link className="text-decoration-none text-white" to="/booking">
                Book Now
              </Link>
            </button>
          </div>
        </div>
        <hr />
      </Container>
    </>
  );
};

export default PropertyDetails;
