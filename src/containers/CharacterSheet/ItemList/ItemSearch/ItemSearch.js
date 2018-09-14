import React, { Component } from 'react';
import Autosuggest from 'react-autosuggest';
import axios from 'axios';

import './ItemSearch.css';
import '../../../../assets/items/ItemIcons.css';

let items = [];

// SEE EXAMPLE AT https://codepen.io/moroshko/pen/ZQLyNK?editors=0010

const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0
    ? []
    : items.filter(
        item => item.itemName.toLowerCase().slice(0, inputLength) === inputValue
      );
};

const getSuggestionValue = suggestion => suggestion.itemName;

const renderSuggestion = suggestion => (
  <div className={'Slot ' + suggestion.slot}>
    <div>{suggestion.itemName}</div>
    <div>{suggestion.itemCost}g</div>
  </div>
);

class ItemSearch extends Component {
  state = {
    value: '',
    suggestions: [],
    selectedItem: {},
    items: null
  };

  componentDidMount() {
    axios
      .get('https://gloomhaven-character-sheet.firebaseio.com/items')
      .then(res => {
        items.push({
          ...this.state,
          items: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  onSuggestionSelected = (event, { suggestion }) => {
    this.setState({
      selectedItem: {
        itemName: suggestion.itemName,
        itemCost: suggestion.itemCost,
        id: suggestion.id,
        slot: suggestion.slot
      }
    });
  };
  addItem = () => {
    this.props.addItem(this.state.selectedItem);
    this.setState({
      value: '',
      suggestions: [],
      selectedItem: {}
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: 'Search for an item...',
      value,
      onChange: this.onChange
    };

    return (
      <div>
        <Autosuggest
          suggestions={suggestions}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          getSuggestionValue={getSuggestionValue}
          onSuggestionSelected={this.onSuggestionSelected}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
        />
        <button onClick={this.addItem}>Add Item</button>
      </div>
    );
  }
}

export default ItemSearch;
