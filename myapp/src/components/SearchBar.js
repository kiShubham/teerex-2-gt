import { TextField, Box, Button } from "@mui/material";
import React from "react";
import "./SearchBar.css";
import filterSvg from "../assests/filter.svg";

const SearchBar = ({ searchText, showFilter }) => {
  return (
    <div className="search-bar">
      <Button
        variant="outlined"
        onClick={showFilter}
        style={{ borderColor: "black" }}
      >
        <img src={filterSvg} alt="filter" />
      </Button>
      <Box style={{ fontSize: "21px" }}>🔍</Box>
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
