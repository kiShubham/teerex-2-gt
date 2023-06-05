// import { Box, Typography } from "@mui/material";
import React from "react";
import "./ProductCard.css";

const ProductCard = ({ item }) => {
  return (
    <>
      <div className="productCard">
        <img src={item.imageURL} alt={item.name} />
        <div className="detail_box">
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
