import React, { useState, useEffect } from "react";
import Header from "./Header";
import { Button, Box, Typography } from "@mui/material";
import "./Checkout.css";
import axios from "axios";
import { enqueueSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [productList, setProductList] = useState([]);
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  const fetchProduct = async () => {
    let res = await axios(
      "https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json"
    );
    if (res && res.data) {
      setProductList(res.data);
      //   console.log(res.data);
      return res.data;
    }

    //also write for failure
  };
  useEffect(() => {
    const onload = async () => {
      let productData = await fetchProduct();
      getCartItem(productData);
    };
    onload();
  }, []);

  const getCartItem = (productData) => {
    let tempCart = localStorage.getItem("cartArray");
    let tempDetail = JSON.parse(tempCart); //
    // console.log(tempDetail);

    if (!tempDetail) return; // not writing !tempDetail.length as it will give error as tempCart will undefined if no products added and so for tempDetail ;
    let cartDetail = tempDetail.map((e) => ({
      ...e,
      ...productData.find((elem) => elem.id === e.ID),
    }));

    // console.log(cartDetail); //getting full object for particular cart item;
    setCart(cartDetail);
  };

  /*
   * calculating total Amount ->
   */

  const AmountCalculte = () => {
    let total = 0;
    cart.forEach((e) => {
      total = total + e.QTY * e.price;
    });
    return total;
  };
  let totalAmount = AmountCalculte();

  /*
   * handle delete button->
   */

  const handleDelete = (id) => {
    let arr = [...cart];
    let tempCart = localStorage.getItem("cartArray");
    let tempDetail = JSON.parse(tempCart);
    let idx = 0;

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === id) {
        idx = i;
        break;
      }
    }
    arr.splice(idx, 1);
    tempDetail.splice(idx, 1);

    let stirngArr = JSON.stringify(tempDetail); // saving the array of object in string format in local Storage ;
    if (tempDetail.length) {
      localStorage.setItem("cartArray", stirngArr);
    } else {
      localStorage.removeItem("cartArray");
    }
    setCart(arr);
  };

  /*
   * handling Quantity ->
   */
  const handleQty = (i, item) => {
    if (i === true && item.QTY === item.quantity) {
      enqueueSnackbar("Maximum limit reached,for particular product", {
        variant: "warning",
      });
      return;
    }
    let arr = [...cart];
    let object = { ...item };
    // console.log(object);
    let currQty = object.QTY;
    if (i === true) {
      object.QTY = currQty + 1;
    }
    if (i === false) {
      object.QTY = currQty - 1;
    }

    let idx = 0;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].ID === item.ID) {
        idx = i;
        break;
      }
    }
    let tempCart = localStorage.getItem("cartArray");
    let tempDetail = JSON.parse(tempCart);

    if (object.QTY > 0) {
      arr.splice(idx, 1, object);
      tempDetail.splice(idx, 1, { ID: item.ID, QTY: object.QTY });
    } else {
      arr.splice(idx, 1);
      tempDetail.splice(idx, 1);
    }
    let stirngArr = JSON.stringify(tempDetail); // saving the array of object in string format in local Storage ;
    if (tempDetail.length) {
      localStorage.setItem("cartArray", stirngArr);
    } else {
      localStorage.removeItem("cartArray");
    }

    setCart(arr);
  };

  return (
    <div className="CheckoutPage">
      <div className="HeaderINCheckout">
        <Header />
      </div>
      <Box className="Details">
        <Typography variant="h5">
          {cart.length ? (
            <>Your Shopping cart 🛒</>
          ) : (
            <>Your cart 🛒 is Empty</>
          )}
        </Typography>
        <Box>
          {cart.length ? (
            <div className="CheckoutcartPage">
              {cart.map((item) => {
                return (
                  <Box className="media" key={item.id}>
                    <img src={item.imageURL} alt={item.name} />
                    <Box className="item_Info">
                      <p>{item.name}</p>
                      <p>Rs. {item.price}</p>
                    </Box>
                    <div className="Qty_buttons">
                      <Button
                        variant="text"
                        onClick={() => handleQty(true, item)}
                      >
                        🔼
                      </Button>
                      <p>{item.QTY}</p>
                      <Button
                        variant="text"
                        onClick={() => handleQty(false, item)}
                      >
                        🔽
                      </Button>
                    </div>
                    <Button
                      className="Delete_button"
                      variant="contained"
                      onClick={() =>
                        setTimeout(() => {
                          handleDelete(item.ID);
                        }, 500)
                      }
                    >
                      delete
                    </Button>
                  </Box>
                );
              })}
              <hr style={{ marginTop: "10px" }} />
              <Box className="totalAmount">
                <p>TOTAL AMOUNT : </p>
                <p> Rs. {totalAmount}</p>
              </Box>
            </div>
          ) : (
            <>
              <Box className="empty_cart">
                <Button variant="contained" onClick={() => navigate("/")}>
                  go to products page 👕
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

export default Checkout;
