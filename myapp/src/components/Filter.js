import React from "react";
import "./Filter.css";
import { Box } from "@mui/material";

const Filter = ({
  applyColorFilter,
  applyTypeFilter,
  applyGenderFilter,
  applyPriceFilter,
  filterIconBoolean,
}) => {
  return (
    <Box className="Filter_bar">
      <fieldset>
        <legend>Color</legend>

        <div>
          <input
            type="checkbox"
            id="Red"
            name="Red"
            onChange={applyColorFilter}
          />
          <label for="Red">Red</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Blue"
            name="Blue"
            onChange={applyColorFilter}
          />
          <label for="Blue">blue</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Green"
            name="Green"
            onChange={applyColorFilter}
          />
          <label for="Green">Green</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Gender</legend>

        <div>
          <input
            type="checkbox"
            id="Men"
            name="Men"
            onChange={applyGenderFilter}
          />
          <label for="Men">Men</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Women"
            name="Women"
            onChange={applyGenderFilter}
          />
          <label for="Women">Women</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Price</legend>

        <div>
          <input
            type="checkbox"
            id="0-250"
            name="0-250"
            onChange={applyPriceFilter}
          />
          <label for="0-250">0 - Rs.250</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="251-450"
            name="251-450"
            onChange={applyPriceFilter}
          />
          <label for="251-451">Rs.251-450</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="451-500"
            name="451-500"
            onChange={applyPriceFilter}
          />
          <label for="451-500">Rs.450 🔼</label>
        </div>
      </fieldset>
      <fieldset>
        <legend>Type</legend>

        <div>
          <input
            type="checkbox"
            id="Polo"
            name="Polo"
            onChange={applyTypeFilter}
          />
          <label for="Polo">Polo</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Hoodie"
            name="Hoodie"
            onChange={applyTypeFilter}
          />
          <label for="Hoodie">Hoodie</label>
        </div>
        <div>
          <input
            type="checkbox"
            id="Basic"
            name="Basic"
            onChange={applyTypeFilter}
          />
          <label for="Basic">Basic</label>
        </div>
      </fieldset>
    </Box>
  );
};

export default Filter;
