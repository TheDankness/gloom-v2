import * as actions from '../actions/actionTypes';
import { updateObject, dingCheck } from '../utility';

const initialState = {
  id: 'FAKE-ID',
  charData: {},
  loading: true,
  success: null,
  saving: null,
  lastSaved: null
};

const createCharInit = state => {
  return updateObject(state, { loading: true });
};

const createCharSuccess = (state, action) => {
  return updateObject(state, {
    id: action.id,
    charData: action.charData,
    success: true
  });
};

const fetchCharacterInit = state => {
  return updateObject(state, {
    loading: true,
    success: false
  });
};

const fetchCharacterSuccess = (state, action) => {
  return updateObject(state, {
    id: action.id,
    charData: action.charData,
    loading: false,
    success: true
  });
};

const fetchCharacterFail = (state, action) => {
  return {
    ...state,
    loading: false,
    error: action.error
  }
}

const checkPerk = (state, action) => {
  const perksClone = [...state.charData.perks];
  perksClone[action.perkID] = {
    ...perksClone[action.perkID],
    boxesChecked: {
      ...state.charData.perks[action.perkID].boxesChecked,
      [action.boxID]: !action.status
    }
  };

  return {
    ...state, 
    charData: {
       ...state.charData,
      perks: perksClone
    }
  }
}

const modifyGold = (state, action) => {
  return {
    ...state,
    charData: {
      ...state.charData,
      gold: state.charData.gold + Number(action.num)
    }
  }
}

const modifyXP = (state, action) => {
  const modifiedXP = state.charData.xp + Number(action.num);
  const modifiedLevel = dingCheck(modifiedXP);

  if (state.charData.level === modifiedLevel) {
    return {
      ...state,
      charData: {
        ...state.charData,
        xp: modifiedXP
      }
    }
  } else {
    return {
      ...state,
      charData: {
        ...state.charData,
        xp: modifiedXP,
        level: modifiedLevel
      }
    }
  }
}

const addItem = (state, action) => {
  return {
    ...state,
    charData: {
      ...state.charData,
      items: {
        ...state.charData.items,
        [action.slot]: action.item
      }
    }
  }
}

const saveChangesInit = (state, action) => {
  return {
    ...state,
    saving: true
  }
}

const saveChangesSuccess = (state, action) => {
  return {
    ...state,
    saving: false,
    lastSaved: action.lastSaved
  }
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.CREATE_CHAR_INIT:
      return createCharInit(state, action);
    case actions.CREATE_CHAR_SUCCESS:
      return createCharSuccess(state);
    case actions.FETCH_CHARACTER_INIT:
      return fetchCharacterInit(state, action);
    case actions.FETCH_CHARACTER_SUCCESS:
      return fetchCharacterSuccess(state, action);
    case actions.FETCH_CHARACTER_FAIL:
      return fetchCharacterFail(state, action);
    case actions.CHECK_PERK:
      return checkPerk(state, action);
    case actions.MODIFY_GOLD:
      return modifyGold(state, action);
    case actions.MODIFY_XP:
      return modifyXP(state, action);
    case actions.ADD_ITEM:
      return addItem(state, action);
    case actions.SAVE_CHANGES_INIT:
      return saveChangesInit(state, action);
    case actions.SAVE_CHANGES_SUCCESS:
      return saveChangesSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
