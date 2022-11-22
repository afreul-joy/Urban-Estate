import React from "react";
import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomeProperty from "./HomeProperty/HomeProperty";

const HomeProperties = () => {
  const [properties, setProperties] = useState([]);
  useEffect(() => {
    fetch("https://urban-estate-server.onrender.com/properties")
      .then((res) => res.json())
      .then((json) => setProperties(json));
  }, []);
  return (
    <Container>
      <div className="row">
        <h1 className="destination-heading">Our Properties</h1>
        <hr />
        {properties.map((property) => (
          <HomeProperty key={property.id} property={property}></HomeProperty>
        ))}
      </div>
     
      <Link to="/properties"><button className="find-btn">Find More</button></Link>
     
    </Container>
  );
};

export default HomeProperties;
