import React from 'react';
import '../../../assets/items/ItemIcons.css';
import './ItemList.css';
import Box from '../../../hoc/Box/Box';
import ItemSearch from './ItemSearch/tempItemSearch';

const ItemList = props => {
  return (
    <Box>
      <h3>Items</h3>
      <div className="itemList">
        <p className="helm">
          {props.charData.items.helm ? props.charData.items.helm : <span className="empty">Empty</span>}
        </p>
        <p className="chest">
          {props.charData.items.chest ? props.charData.items.chest : <span className="empty">Empty</span>}
        </p>
        <p className="boots">
          {props.charData.items.boots ? props.charData.items.boots : <span className="empty">Empty</span>}
        </p>
        <p className="oneHand">
          {props.charData.items.oneHand ? props.charData.items.oneHand : <span className="empty">Empty</span>}
        </p>
        <p className="twoHands">
          {props.charData.items.twoHands ? props.charData.items.twoHands : <span className="empty">Empty</span>}
        </p>
        <p className="consumable">
          {props.charData.items.consumable ? props.charData.items.consumable : <span className="empty">Empty</span>}
        </p>
      </div>
      <hr/>
      <h3>Available Items</h3>
      <ItemSearch addItem={(item, slot) => props.addItem(item, slot)} buyItem={(cost) => {props.buyItem(cost)}}/>
    </Box>
  );
};

export default ItemList;
