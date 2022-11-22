import React from "react";
import { Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

const Booking = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    
    fetch("https://urban-estate-server.onrender.com/mybooking", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId) {
          alert("Booked Successfully!");
        }
      });
    console.log(data);
    reset();
  };
  return (
    <Container>
      <h2>Please Fill up the form!</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="form-control"
          placeholder="Your Full Name"
          {...register("fullName")}
        />
        <input
          type="text"
          className="form-control"
          placeholder="Your Loaction"
          {...register("location")}
        />
        <input
          type="email"
          className="form-control"
          placeholder="Email Address"
          {...register("email")}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Phone Number"
          {...register("phone")}
        />
        <input className="my-3" type="submit" />
      </form>
    </Container>
  );
};

export default Booking;
