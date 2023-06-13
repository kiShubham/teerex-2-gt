// import { Box, Typography } from "@mui/material";
import React from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";

const ProductCard = ({ item }) => {
  return (
    <>
      <div className="productCard">
        <img src={item.imageURL} alt={item.name} />
        <div className="detail_box">
          <p>{item.name}</p>
          <p>{item.price}</p>
        </div>
        <Button variant="contained" className="AddToCart">
          ADD TO CART
        </Button>
      </div>
    </>
  );
};

export default ProductCard;
