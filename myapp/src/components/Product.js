import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";
import { Box, Typography } from "@mui/material";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Filter from "./Filter";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [colorArray, setColorArray] = useState([]);
  const [genderArray, setGenderArray] = useState([]);
  const [priceArray, setPriceArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  const [filterInput, setFilterInput] = useState([]);

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

  const checkDuplicateElement = (majorArray, subArray) => {
    subArray.forEach((element) => {
      let bool = false;
      majorArray.forEach((e) => {
        if (e.id === element.id) {
          bool = true;
        }
      });
      if (bool === false) majorArray.push(element);
    });
    return majorArray;
  };
  /*
   * search bar logic -->
   */

  const captureSearchtext = (e) => {
    let searchText = e.target.value.trim().toLowerCase();
    if (!searchText.length) {
      setSearchTerm("");
      return setFilteredList(productList);
    } else {
      setSearchTerm(searchText);
    }

    /*
     * case insensitive string comparison ; using toUpperCase in both string for comparison ;
     * regular search term in order, eg: black , polo , blue hoddie ;
     * irregular search term like, eg: hoodie blue ; used variable words for it
     * for search like Yellow black we need to show both search items for yellow ,and black
     * therefore search for each string word ;
     */

    const words = searchText.split(" ");
    let result = [];

    words.forEach((element) => {
      let temp = productList.filter((e) => {
        let nameSearch = e.name.toLowerCase().includes(element); //boolean
        let typeSearch = e.type.toLowerCase().includes(element);

        if (nameSearch) return true;
        else if (typeSearch) return true;
        return false;
      });
      result = checkDuplicateElement(result, temp);
      // result.push(...temp); // pushing all elements of temp into result;
      console.log(result);
    });

    if (result.length) {
      setFilteredList(result);
    } else setFilteredList([]);
  };

  /*
   * filter Handle logic -->
   ! todo:
   */

  let filterPushingFunction = (array, checks) => {
    if (array.includes(checks)) {
      let idx = array.indexOf(checks);
      array.splice(idx, 1);
    } else {
      array.splice(array.length, 0, checks);
    }
    return array;
  };

  const filterColorHandler = (e) => {
    let checks = e.target.name;
    filterPushingFunction(colorArray, checks);
    console.log(colorArray);
    let result = [];
    //now filter an array of products that matches color with ;
    colorArray.forEach((elem) => {
      let temp = [];
      temp = productList.filter((e) => {
        if (e.color === elem) return true;
      });
      temp.forEach((e) => result.push(e));
    });
    // console.log(result);
    if (result.length) {
      //compare with existing filteredList;
      setFilteredList(result);
    } else setFilteredList(productList);
  };
  const filterTypeHandler = (e) => {};
  const filterGenderHandler = (e) => {};
  const filterPriceHandler = (e) => {};

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
                <aside className="filter">
                  <Filter
                    applyColorFilter={filterColorHandler}
                    applyTypeFilter={filterTypeHandler}
                    applyGenderFilter={filterGenderHandler}
                    applyPriceFilter={filterPriceHandler}
                  />
                </aside>
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
/**
 let result = [];
    filterInput.forEach((element) => {
      let temp = filteredList.filter((e) => {
        let colorFilter = e.color.includes(element); //boolean value;
        let typeFilter = e.type.includes(element);
        let genderFilter = e.gender.includes(element);

        if (colorFilter) return true;
        else if (typeFilter) return true;
        else if (genderFilter) return true;
      });
      temp.forEach((e) => {
        let bool = false;
        result.forEach((elem) => {
          if (elem.id === e.id) {
            bool = true;
          }
        });
        if (bool === false) result.push(e);
      });
    });
    console.log(result);
    if (result.length) {
      setFilteredList(result);
    } else setFilteredList([]);
 */
/*
    const filterHandler = (e) => {
      // let filterArray = JSON.parse(JSON.stringify(filterInput));
  
      let checks = e.target.name;
  
      if (filterInput.includes(checks)) {
        let idx = filterInput.indexOf(checks);
        filterInput.splice(idx, 1);
      } else {
        filterInput.splice(filterInput.length, 0, checks);
      }
  
      if (filterInput.length === 0 && searchTerm.length === 0) {
        setFilteredList(productList);
        return;
      } else if (filterInput.length === 0 && searchTerm.length !== 0) {
        // capturesearchtext(searchTerm) ,e.target.value = search term;
      }
      let result = [];
      let tempList = [];
      if (searchTerm) tempList = [...filteredList];
      else tempList = [...productList];
  
      console.log(filterInput);
      filterInput.forEach((elem) => {
        let temp;
        if (elem === "0-250" || elem === "251-450" || elem === "451-500") {
          let range = elem.split("-"); //["0","250"]
          temp = tempList.filter((e) => {
            if (range[0] <= e.price && e.price <= range[1]) return true;
          });
        } else {
          temp = tempList.filter((e) => {
            if (e.color === elem) return true;
            else if (e.type === elem) return true;
            else if (e.gender === elem) return true;
          });
        }
        result = checkDuplicateElement(result, temp);
      });
      if (result.length) {
        setFilteredList(result);
      }
    };
    */
