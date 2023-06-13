import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import SearchBar from "./SearchBar";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchProduct = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      setProductList(res.data);
      return res.data;
    }

    //also write for failure
  };
  useEffect(() => {
    const onload = async () => {
      let productData = await fetchProduct();
      setFilteredList(productData);
    };
    onload();
  }, []);

  const captureSearchtext = (e) => {
    // console.log(filteredList);
    let searchText = e.target.value.trim().toLowerCase();
    if (!searchText.length) {
      setSearchTerm("");
      return setFilteredList(productList);
    } else {
      setSearchTerm(searchText);
    }

    /**
     ** case insensitive string comparison ; using toUpperCase in both string for comparison ;
     ** regular search term in order, eg: black , polo , blue hoddie ;
     ** irregular search term like, eg: hoodie blue ; used variable words for it
     */
    const words = searchText.split(" ");
    let result = [];

    /**
     ** for search like Yellow black we need to show both search items for yellow ,and black
     ** therefore search for each string word ;
     */

    words.forEach((element) => {
      let temp = productList.filter((e) => {
        let nameSearch = e.name.toLowerCase().includes(element);
        let typeSearch = e.type.toLowerCase().includes(element);

        if (nameSearch) return nameSearch;
        else if (typeSearch) return typeSearch;
      });
      result.push(...temp);
    });

    console.log(result);

    if (result.length) {
      setFilteredList(result);
    } else setFilteredList([]);
  };
  return (
    <div>
      <div className="mainPage">
        <header>
          <Header />
        </header>
        <section className="productAndSearchbar">
          <Box>
            <SearchBar searchText={captureSearchtext} />
          </Box>
          {filteredList.length ? (
            <>
              <Box className="filterAndProductGrid">
                <Typography className="filter">filter</Typography>
                <div className="productGrid">
                  {filteredList.map((item) => {
                    return (
                      <div key={item.id}>
                        <ProductCard item={item} />
                      </div>
                    );
                  })}
                </div>
              </Box>
            </>
          ) : (
            <>
              <section className="noProducts">
                Sorry No Products Find 🙁
              </section>
            </>
          )}
        </section>
      </div>
    </div>
  );
};

export default Product;
