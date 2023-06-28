// import { Box, Typography } from "@mui/material";
import React from "react";
import "./ProductCard.css";
import { Button } from "@mui/material";

const ProductCard = ({ item, handleAddtoCart }) => {
  return (
    <>
      <div className="productCard">
        <img src={item.imageURL} alt={item.name} />
        <div className="detail_box">
          <p>{item.name}</p>
          <p>Rs .{item.price}</p>
        </div>
        <Button
          variant="contained"
          onClick={() => handleAddtoCart(item)}
          className={!item.quantity ? "notAvailable" : "available"}
        >
          {!item.quantity ? <>OUT OF STOCK</> : <>ADD TO CART</>}
        </Button>
      </div>
    </>
  );
};

export default ProductCard;
