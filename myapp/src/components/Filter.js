import React, { useRef, useState } from "react";
import "./Filter.css";
import { Box, Button, Typography } from "@mui/material";

const Filter = ({ HandleFilterOutput, productList, handleRemoveFilter }) => {
  const [colorArray, setColorArray] = useState([]);
  const [genderArray, setGenderArray] = useState([]);
  const [priceArray, setPriceArray] = useState([]);
  const [typeArray, setTypeArray] = useState([]);
  const [filterInput, setFilterInput] = useState([]);

  let filterPushingFunction = (array, checks) => {
    if (array.includes(checks)) {
      let idx = array.indexOf(checks);
      array.splice(idx, 1);
    } else {
      array.splice(array.length, 0, checks);
    }
    return array;
  };
  let compareElementFunc = (result, array) => {
    filterInput.forEach((elem) => {
      let temp = [];
      if (array[0] === "price") {
        if (elem === "0-250" || elem === "251-450" || elem === "451-500") {
          let range = elem.split("-"); //["0","250"]
          temp = productList.filter((e) => {
            if (range[0] <= e.price && e.price <= range[1]) return true;
            return false;
          });
        }
      } else {
        temp = productList.filter((e) => {
          if (array[0] === "color") {
            if (e.color === elem) return true;
          } else if (array[0] === "type") {
            if (e.type === elem) return true;
          } else if (array[0] === "gender") {
            if (e.gender === elem) return true;
          }
          return false;
        });
      }
      temp.forEach((e) => result.push(e));
    });
    return result;
  };

  const filterColorHandler = (e) => {
    let result = [];
    let checks = e.target.name;
    filterPushingFunction(filterInput, checks);
    console.log(filterInput);
    result = compareElementFunc(result, ["color"]); // specifying which handler is calling the function;
    // console.log(result);
    if (result.length) {
      // setFilteredList(result);
      setColorArray(result);
    } else {
      setColorArray([]);
      // setFilteredList(productList);
    }
  };

  // console.log("colorArray");
  // console.log(colorArray);
  // console.log("typeArray");
  // console.log(typeArray);
  // console.log("priceArray");
  // console.log(priceArray);
  // console.log("genderArray");
  // console.log( genderArray);

  const filterTypeHandler = (e) => {
    let result = [];
    let checks = e.target.name;
    filterPushingFunction(filterInput, checks);
    console.log(filterInput);
    result = compareElementFunc(result, ["type"]);
    if (result.length) {
      setTypeArray(result);
    } else setTypeArray([]);
  };
  const filterGenderHandler = (e) => {
    let result = [];
    let checks = e.target.name;
    filterPushingFunction(filterInput, checks);
    console.log(filterInput);
    result = compareElementFunc(result, ["gender"]);
    if (result.length) {
      setGenderArray(result);
    } else setGenderArray([]);
  };
  const filterPriceHandler = (e) => {
    let result = [];
    let checks = e.target.name;
    filterPushingFunction(filterInput, checks);
    console.log(filterInput);
    result = compareElementFunc(result, ["price"]);
    if (result.length) {
      setPriceArray(result);
    } else setPriceArray([]);
  };

  const Comparetwo = (array_1, array_2) => {
    let result = [];
    array_1.forEach((elem) => {
      let temp = [];
      temp = array_2.filter((e) => {
        if (e.id === elem.id) return true;
        else return false;
      });
      result.push(...temp);
    });
    return result;
  };

  const handleApplyFilter = (e) => {
    if (
      colorArray.length === 0 &&
      typeArray.length === 0 &&
      genderArray.length === 0 &&
      priceArray.length === 0
    ) {
      return handleRemoveFilter();
    }
    //!4 compare ;
    let filterOutput = [];

    if (
      colorArray.length &&
      typeArray.length &&
      genderArray.length &&
      priceArray.length
    ) {
      let res1 = [];
      let res2 = [];
      let ans = [];
      res1 = Comparetwo(colorArray, typeArray);
      res2 = Comparetwo(priceArray, genderArray);
      ans = Comparetwo(res1, res2);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log(ans);
      } else console.log("none item matched");
    }
    //!compare three
    else if (colorArray.length && typeArray.length && priceArray.length) {
      let res1 = Comparetwo(colorArray, typeArray);
      let ans = Comparetwo(res1, priceArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (colorArray.length && genderArray.length && priceArray.length) {
      let res1 = Comparetwo(colorArray, genderArray);
      let ans = Comparetwo(res1, priceArray); // red men polo not working
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (genderArray.length && typeArray.length && priceArray.length) {
      let res1 = Comparetwo(genderArray, typeArray);
      let ans = Comparetwo(res1, priceArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (colorArray.length && typeArray.length && genderArray.length) {
      console.log("first");
      let res1 = Comparetwo(colorArray, genderArray); //! working ;
      let ans = Comparetwo(res1, typeArray);
      if (ans.length) {
        filterOutput = [...ans];
        console.log("ans");
        console.log(ans);
      } else console.log("none item matched");
    }

    //! compare two
    else if (colorArray.length && typeArray.length) {
      let ans = [];
      ans = Comparetwo(colorArray, typeArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (colorArray.length && priceArray.length) {
      let ans = [];
      ans = Comparetwo(colorArray, priceArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (colorArray.length && genderArray.length) {
      let ans = [];
      ans = Comparetwo(colorArray, genderArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (typeArray.length && genderArray.length) {
      let ans = [];
      ans = Comparetwo(typeArray, genderArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (typeArray.length && priceArray.length) {
      let ans = [];
      ans = Comparetwo(typeArray, priceArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (priceArray.length && genderArray.length) {
      let ans;
      ans = Comparetwo(priceArray, genderArray);
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    }
    //! single checks;
    else if (priceArray.length) {
      let ans = [];
      ans = priceArray;
      if (ans.length) {
        filterOutput = [...ans];
        console.log("ans");
        console.log(ans);
      } else console.log("none item matched");
    } else if (colorArray.length) {
      let ans = [];
      ans = colorArray;
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (typeArray.length) {
      let ans = [];
      ans = typeArray;
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    } else if (genderArray.length) {
      let ans = [];
      ans = genderArray;
      if (ans.length) {
        filterOutput = [...ans];
        // console.log("ans");
        // console.log(ans);
      } else console.log("none item matched");
    }
    HandleFilterOutput(filterOutput);
  };
  const ref = useRef([]);

  const Unchecked = () => {
    console.log(ref.current.length);
    for (let i = 0; i < ref.current.length; i++) {
      ref.current[i].checked = false;
    }
    colorArray.splice(0);
    genderArray.splice(0);
    typeArray.splice(0);
    priceArray.splice(0);
    handleRemoveFilter();
  };

  return (
    <div>
      <Box className="Filter_bar">
        <Box className="filterOptions">
          <Typography variant="h5">Color</Typography>

          <div>
            <input
              type="checkbox"
              id="Red"
              name="Red"
              onChange={filterColorHandler}
              ref={(element) => {
                ref.current[0] = element;
              }}
            />
            <label for="Red">Red</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Blue"
              name="Blue"
              onChange={filterColorHandler}
              ref={(element) => {
                ref.current[1] = element;
              }}
            />
            <label for="Blue">blue</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Green"
              name="Green"
              onChange={filterColorHandler}
              ref={(element) => {
                ref.current[2] = element;
              }}
            />
            <label for="Green">Green</label>
          </div>
        </Box>
        <Box className="filterOptions">
          <Typography variant="h5">Gender</Typography>

          <div>
            <input
              type="checkbox"
              id="Men"
              name="Men"
              onChange={filterGenderHandler}
              ref={(element) => {
                ref.current[3] = element;
              }}
            />
            <label for="Men">Men</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Women"
              name="Women"
              onChange={filterGenderHandler}
              ref={(element) => {
                ref.current[4] = element;
              }}
            />
            <label for="Women">Women</label>
          </div>
        </Box>
        <Box className="filterOptions">
          <Typography variant="h5">Price</Typography>

          <div>
            <input
              type="checkbox"
              id="0-250"
              name="0-250"
              onChange={filterPriceHandler}
              ref={(element) => {
                ref.current[5] = element;
              }}
            />
            <label for="0-250">0 - Rs.250</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="251-450"
              name="251-450"
              onChange={filterPriceHandler}
              ref={(element) => {
                ref.current[6] = element;
              }}
            />
            <label for="251-451">Rs.251-450</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="451-500"
              name="451-500"
              onChange={filterPriceHandler}
              ref={(element) => {
                ref.current[7] = element;
              }}
            />
            <label for="451-500">Rs.450 🔼</label>
          </div>
        </Box>
        <Box className="filterOptions">
          <Typography variant="h5">Type</Typography>

          <div>
            <input
              type="checkbox"
              id="Polo"
              name="Polo"
              onChange={filterTypeHandler}
              ref={(element) => {
                ref.current[8] = element;
              }}
            />
            <label for="Polo">Polo</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Hoodie"
              name="Hoodie"
              onChange={filterTypeHandler}
              ref={(element) => {
                ref.current[9] = element;
              }}
            />
            <label for="Hoodie">Hoodie</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="Basic"
              name="Basic"
              onChange={filterTypeHandler}
              ref={(element) => {
                ref.current[10] = element;
              }}
            />
            <label for="Basic">Basic</label>
          </div>
        </Box>
      </Box>
      <div className="action_buttons_filters">
        <Button variant="contained" onClick={handleApplyFilter}>
          Apply Filters
        </Button>
        <Button variant="contained" onClick={Unchecked}>
          Remove filters
        </Button>
      </div>
    </div>
  );
};

export default Filter;
