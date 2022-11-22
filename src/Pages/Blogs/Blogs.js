import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Blog from "./Blog/Blog";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("https://urban-estate-server.onrender.com/allBlogs")
      .then((res) => res.json())
      .then((json) => setBlogs(json));
  }, []);
  return (
    <>
      <div>
        <img
          className="img-fluid"
          src="https://i.ibb.co/Jm5fjRN/real.png"
          alt=""
        />
      </div>

      <Container>
        {blogs.map((blog) => (
          <Blog blog={blog} key={blog.name}></Blog>
        ))}
      </Container>
    </>
  );
};

export default Blogs;
