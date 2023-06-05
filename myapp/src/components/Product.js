import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import "./Product.css";

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
  // console.log(productList);

  return (
    <div>
      <div className="productPage">
        {productList.length ? (
          <>
            <div className="productGrid">
              {productList.map((item) => {
                return (
                  <div key={item.id}>
                    <ProductCard item={item} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Product;
