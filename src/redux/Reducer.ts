import { Reducer } from 'redux';
import { Action, TokenInterface } from '../ts/interface/reducer.interface';

const initialToken: TokenInterface = {
    token: ""
};

const authReducer: Reducer<TokenInterface, Action> = (state = initialToken, action) => {
    switch (action.type) {
      case "AUTH":
        return { ...state, token: "AUTH" }
      default:
        return state;
    }
  };


export { authReducer };
