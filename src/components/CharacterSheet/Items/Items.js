import React from 'react';

import Box from "../../HOC/Box/Box";
import ItemList from "../../Containers/ItemList/ItemList";
import ItemSearch from "../../Containers/ItemList/ItemSearch/ItemSearch";

const items = (props) => (
  <Box>
  <label className="heading">Items</label>
  <ItemList
    helm={props.helm}
    chest={props.chest}
    boots={props.boots}
    oneHand={props.oneHand}
    twoHands={props.twoHands}
    consumable={props.consumable}
  />

  <ItemSearch addItem={props.addItem} />
  <br />
  Prosperity Level:
  <input
    type="number"
    name="townProsperity"
    value={props.prosperity}
    onChange={props.onProsperityChange}
  />
  </Box>
);

export default items;