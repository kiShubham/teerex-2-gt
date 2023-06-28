import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";
import { Box, Typography, Button } from "@mui/material";
import Header from "./Header";
import SearchBar from "./SearchBar";
import Filter from "./Filter";
import { enqueueSnackbar } from "notistack";

const Product = () => {
  const [productList, setProductList] = useState([]);
  const [filteredList, setFilteredList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterIconBool, setFilterIconBool] = useState(false);
  const [cart, setCart] = useState([]);

  const fetchProduct = async () => {
    try {
      let res = await axios(
        "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
      );
      setProductList(res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      enqueueSnackbar(
        "Could not fetch products. check that the backend running, reachable and returns valid JSON.",
        { variant: "error" }
      );
      return null;
    }
  };
  useEffect(() => {
    const onload = async () => {
      let productData = await fetchProduct();
      setFilteredList(productData);
    };
    onload();
    if (!localStorage.getItem("cartArray"))
      localStorage.setItem("cartArray", "[]");
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
   todo: search bar logic -->
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
      console.log(result);
    });

    if (result.length) {
      setFilteredList(result);
    } else setFilteredList([]);
  };
  const filterIconHandle = () => {
    if (!filterIconBool) setFilterIconBool(true);
    else setFilterIconBool(false);
  };

  /*
   todo: filter Handle logic -->
  */
  const HandleFilterOutput = (value) => {
    setFilteredList(value);
  };
  const HandleRemoveFilter = () => {
    setFilteredList(productList);
  };
  /*
   * handleAddtoCart
   */
  const handleAddtoCart = (item) => {
    // console.log(item.id);
    if (item.quantity === 0) {
      enqueueSnackbar("Sorry! the product is not available", {
        variant: "warning",
      });
      return 0;
    }
    console.log(cart);
    let arr = [...cart];
    let obj = { ID: item.id, QTY: 1 };

    let availableQuantity = item.quantity;

    if (!arr.length) {
      arr.push(obj);
    } else {
      let found = false;
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].ID === obj.ID) {
          found = true;
          console.log("already exists:" + item.id);
          if (arr[i].QTY < availableQuantity) {
            arr[i].QTY = arr[i].QTY + 1;
          } else {
            enqueueSnackbar("Maximum limit reached,for particular product", {
              variant: "warning",
            });
          }
          break;
        }
      }
      if (found === false) {
        arr.push(obj);
      }
    }

    // ! checking if the item already exist in the localStorage Array ;

    let existstroage = localStorage.getItem("cartArray");
    let existArr = JSON.parse(existstroage);

    let temp = [];
    for (let i = 0; i < existArr.length; i++) {
      let found = false;
      for (let j = 0; j < arr.length; j++) {
        if (existArr[i].ID === arr[j].ID) {
          found = true;
        }
      }
      if (found === false) {
        if (!temp.includes(existArr[i])) temp.push(existArr[i]);
      }
    }
    temp.forEach((e) => arr.push(e));
    let string = JSON.stringify(arr);
    if (temp.length > 0) {
      localStorage.setItem("cartArray", string);
    } else {
      localStorage.setItem("cartArray", string);
    }
    // console.log(arr);
    setCart(arr);
  };

  return (
    <div>
      <div className="mainPage">
        <header>
          <Header />
        </header>
        <section className="productAndSearchbar">
          <Box className="searchAndFilterbutton">
            <SearchBar
              searchText={captureSearchtext}
              showFilter={filterIconHandle}
            />
          </Box>

          <Box className="filterAndProductGrid">
            <aside
              className={filterIconBool ? "filter_desktop" : "filter_mobile"}
            >
              <Filter
                handleRemoveFilter={HandleRemoveFilter}
                HandleFilterOutput={HandleFilterOutput}
                productList={productList}
              />
            </aside>
            {filteredList.length ? (
              <>
                <div className="productGrid">
                  {filteredList.map((item) => {
                    return (
                      <div key={item.id}>
                        <ProductCard
                          item={item}
                          handleAddtoCart={handleAddtoCart}
                        />
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                <section className="noProducts">
                  Sorry No Products Find 🙁
                </section>
              </>
            )}
          </Box>
        </section>
      </div>
    </div>
  );
};

export default Product;
