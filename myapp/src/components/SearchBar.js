import { TextField, Box } from "@mui/material";
import React from "react";
import "./SearchBar.css";
const SearchBar = ({ searchText }) => {
  return (
    <div className="search-bar">
      <Box>🔍</Box>
      <TextField
        placeholder="Search Products"
        variant="standard"
        className="searchText"
        name="search"
        onChange={searchText}
      />
    </div>
  );
};

export default SearchBar;
