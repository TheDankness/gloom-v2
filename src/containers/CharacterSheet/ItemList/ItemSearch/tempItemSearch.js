import React, { Component } from 'react';
import axios from 'axios';

import Loading from '../../../../components/UI/Loading/Loading';
import './tempItemSearch.css';
import '../../../../assets/items/ItemIcons.css';

class ItemSearch extends Component {
  state = {
    items: null,
    selectedItem: null,
    prosperity: 1,
    loading: true
  };

  componentDidMount() {
    axios
      .get('https://gloomhaven-character-sheet.firebaseio.com/items.json')
      .then(res => {
        this.setState({
          ...this.state,
          items: res.data,
          loading:false
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  addItem = (itemName, slot, itemCost) => {
    this.props.addItem(itemName, slot);
    this.props.buyItem(-itemCost);
  };

  render() {

    if (this.state.loading){
      return <Loading loadingText="Loading items..."/>
    } else {
    return (
      <ul className="itemList">
        {this.state.items.map(item => {
          return (
            <li className={"Slot " + item.slot} key={item.itemName}>
              <div><strong>{item.itemName}</strong> ({item.itemCost +'g'})</div>
              <button onClick={(itemName, slot, itemCost) => this.addItem(item.itemName, item.slot, item.itemCost)}>Add Item</button>
            </li>
          )
        })}
      </ul>
    );
  }
  }
}

export default ItemSearch;
