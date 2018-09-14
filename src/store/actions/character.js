import * as actions from './actionTypes';
import axios from 'axios';

export const loaded = () => {
  return {
    type: actions.LOADED
  };
};

export const fetchPerksFail = error => {
  return {
    type: actions.FAIL,
    error: error
  };
};

export const createCharInit = () => {
  return {
    type: actions.CREATE_CHAR_INIT,
    loading: false
  };
};

export const createCharacterSuccess = (id, characterData) => {
  return {
    type: actions.CREATE_CHAR_SUCCESS,
    id: id,
    charData: characterData
  };
};

export const createCharacterFail = error => {
  return {
    type: actions.FAIL,
    error: error
  };
};

// Named a bit weird but this starts the character creation process and is called when you click 'Create Character', will be refactored soon.
export const getPerks = (charName, selectedClass) => {
  return dispatch => {
    dispatch(createCharInit());
    axios
      .get(
        'https://gloomhaven-character-sheet.firebaseio.com/perks/' + selectedClass + '.json'
      )
      .then(res => {
        const userID = localStorage.getItem('userID');
        const token = localStorage.getItem('token');
        const fetchedPerks = [];
        for (let key in res.data) {
          fetchedPerks.push({
            ...res.data[key],
            id: key,
            boxesChecked: {
              box1: false, // Should find a better way to render these
              box2: false, // conditionally based on how many checkboxes
              box3: false  // each perk has... this is lazy but works.
            }
          });
        }
        dispatch(
          continueCreateCharacter(userID, token, charName, selectedClass, fetchedPerks)
        );
      })
      .catch(err => {
        dispatch(fetchPerksFail(err));
      });
  };
};

export const continueCreateCharacter = (
  userID,
  token,
  charName,
  selectedClass,
  fetchedPerks
) => {
  return dispatch => {
    const characterData = {
      userID: userID,
      name: charName,
      archetype: selectedClass,
      level: 1,
      xp: 0,
      gold: 0,
      items: {
        helm: '',
        chest: '',
        legs: '',
        oneHand: '',
        twoHand: '',
        consumable: [null, null, null]
      },
      perks: fetchedPerks,
      active: true
    };
    axios
      .post(
        'https://gloomhaven-character-sheet.firebaseio.com/characters.json?auth=' + token,
        characterData
      )
      .then(res => {
        dispatch(createCharacterSuccess(res.data.name, characterData));
      })
      .catch(err => {
        dispatch(createCharacterFail(err));
      });
  };
};

export const modifyGold = input => {
  return {
    type: actions.MODIFY_GOLD,
    num: input
  };
};

export const modifyXP = input => {
  return {
    type: actions.MODIFY_XP,
    num: input
  };
};

export const addItem = (item, slot) => {
  return {
    type: actions.ADD_ITEM,
    item: item,
    slot: slot
  }
}

export const checkPerk = (perkID, status, boxID) => {
  return {
    type: actions.CHECK_PERK,
    perkID: perkID,
    boxID: boxID,
    status: status
  };
};

export const saveChangesInit = () => {
  return {
    type: actions.SAVE_CHANGES_INIT
  };
};

export const saveChangesFail = err => {
  return {
    type: actions.FAIL,
    error: err
  };
};

export const saveChangesSuccess = (res, lastSaved) => {
  return {
    type: actions.SAVE_CHANGES_SUCCESS,
    response: res,
    lastSaved: lastSaved
  };
};

export const saveChanges = (charData, charID, token) => {
  return dispatch => {
    dispatch(saveChangesInit());
    axios
      .patch(
        'https://gloomhaven-character-sheet.firebaseio.com/characters/' + charID + '.json?auth=' + token,
        charData
      )
      .then(res => {
        const lastSaved = new Date().toLocaleString();
        dispatch(saveChangesSuccess(res, lastSaved));
      })
      .catch(err => {
        dispatch(saveChangesFail(err));
      });
  };
};

export const fetchCharacterInit = () => {
  return {
    type: actions.FETCH_CHARACTER_INIT
  }
}

export const fetchCharacterSuccess = (charData, charID) => {
  return {
    type: actions.FETCH_CHARACTER_SUCCESS,
    charData: charData,
    id: charID
  };
};

export const fetchCharacterFail = err => {
  return {
    type: actions.FETCH_CHARACTER_FAIL,
    error: err
  };
};

export const fetchCharacter = (token, userID) => {
  return dispatch => {
    dispatch(fetchCharacterInit());
    const queryParams = '?auth=' + token + '&orderBy="userID"&equalTo="' + userID + '"';
    axios.get(
      'https://gloomhaven-character-sheet.firebaseio.com/characters.json' + queryParams
    )
    .then(res => {
      const charID = Object.keys(res.data)[0];
      const charData = res.data[Object.keys(res.data)[0]];
      dispatch(fetchCharacterSuccess(charData, charID));
    })
    .catch(err => {
      dispatch(fetchCharacterFail(err));
    });
  };
};
