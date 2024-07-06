import React from "react";
import { Outlet } from "react-router-dom";

const About = () => {
  return (
    <div>
      <h4>about page</h4>
      <Outlet></Outlet>
    </div>
  );
};

export default About;
