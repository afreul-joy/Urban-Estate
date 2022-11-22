import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Property from "./Property/Property";

const Properties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch("https://urban-estate-server.onrender.com/allProperties")
      .then((res) => res.json())
      .then((json) => setProperties(json));
  }, []);
  return (
    <>
      <img
        className="img-fluid"
        src="https://i.ibb.co/GFS9h6w/Untitled-design-1.png"
        alt=""
      />

      <div className="full-cart-area">
        <Container>
          {/* cart area header */}

          <h2 className="cart-heading-title m-5 text-center">
            Find The Right Property For You
          </h2>
          <hr />
          <br />

          {/* Load course data  */}
          <div className="row mb-5">
            {properties.map((property) => (
              <Property key={property.id} property={property}></Property>
            ))}
          </div>
        </Container>
      </div>
    </>
  );
};

export default Properties;
