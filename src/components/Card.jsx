import React from "react";

const Card = (props) => {
  return (
    <div className="col-md-4" key={props.i}>
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
