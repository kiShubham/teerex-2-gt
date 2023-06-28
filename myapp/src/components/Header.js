import { Box, Button } from "@mui/material";
import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const handleCartButton = () => {
    navigate("/checkout");
  };
  const handleProductButton = () => {
    navigate("/");
  };
  const numProducts = () => {
    let str = localStorage.getItem("cartArray");
    let total = 0;
    if (str) {
      let arr = JSON.parse(str);
      // console.log(arr);

      arr.forEach((e) => {
        total = total + e.QTY;
      });
    }
    return total;
  };
  let count;
  if (numProducts()) {
    // only show when item added to cart  ;
    count = numProducts();
  }
  return (
    <Box className="Header">
      <Box className="brand_name" onClick={handleProductButton}>
        Teerex Store 🐱‍👤
      </Box>
      <Box className="action_buttons">
        <Button
          variant="outlined"
          className="productsButton"
          onClick={handleProductButton}
        >
          products
        </Button>
        <Box>
          <Button
            variant="contained"
            className="cartButton"
            onClick={handleCartButton}
          >
            🛒
            {count}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
