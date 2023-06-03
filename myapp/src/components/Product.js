import axios from "axios";
import React, { useEffect, useState } from "react";

const Product = () => {
  const [productList, setProductList] = useState([]);

  const fetchProduct = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      setProductList(res.data);
    }
  };
  useEffect(() => {
    const onload = async () => {
      let ers = await fetchProduct();
    };
    onload();
  }, []);

  return <div>Products</div>;
};

export default Product;
