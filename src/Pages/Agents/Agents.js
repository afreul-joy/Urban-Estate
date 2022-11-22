import React from "react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Agent from "./Agent/Agent";

const Agents = () => {
  const [agents, setAgents] = useState([]);
  useEffect(() => {
    fetch("https://urban-estate-server.onrender.com/allAgent")
      .then((res) => res.json())
      .then((json) => setAgents(json));
  }, []);
  return (
    <>
    <img className="img-fluid" src="https://i.ibb.co/M1KYtD2/Untitled-design-2.png" alt="" />
    <Container>
      <Row className="py-5">
        <Col>
          <h2 className="doctors-area-heading">
            Enjoy Specialized Care Through <br />
            Contact with Our Agents Support.
          </h2>
        </Col>
      </Row>
      <Row className="gy-3 mb-5">
        {agents.map((agent) => (
          <Agent agent={agent} key={agents.id}></Agent>
        ))}
      </Row>
    </Container>
    </>
  );
};

export default Agents;
