import React from "react";
import { useNavigate } from "react-router-dom";

const Card = (props) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
        navigate(`/detail/${props.i}`);
      }}
      className="col-md-4"
      key={props.i}
    >
      <img
        src={`https://codingapple1.github.io/shop/shoes${props.i}.jpg`}
        width="80%"
      />
      <h4>{props.shoes.title}</h4>
      <p>{props.shoes.price}</p>
    </div>
  );
};

export default Card;
