import { Box, Button } from "@mui/material";
import React from "react";
import "./Header.css";
const Header = () => {
  return (
    <Box className="Header">
      <Box className="brand_name">Teerex Store 🐱‍👤</Box>
      <Box className="action_buttons">
        <Button variant="contained" className="productsButton">
          products
        </Button>
        <Button variant="contained" className="cartButton">
          🛒
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
