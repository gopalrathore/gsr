import { TOGGLE_BULB_STATE, JUMP_TO, TOGGLE_LOGO_STATE, CHANGE_BULB_LOCATION } from "./actions";

export interface History {
  bulbState:boolean;
  logoState:boolean;
  bulbLocation:BulbLocation
}

export interface BulbLocation {
  x:number;
  y:number
}

export interface IAppState {
  history:History[];
  count:number;
}

export const INITIAL_STATE: IAppState = {
  history: [{
    bulbState: false,
    logoState: true,
    bulbLocation: { x:0, y:0 }
  }],
  count: 0
}

export function rootReducer(state:IAppState, action):IAppState{

  switch (action.type) {
    case TOGGLE_BULB_STATE:
      return toggleBulbState(state);
    case JUMP_TO:
      return {
        ...state,
        count: action.count
      }
    case TOGGLE_LOGO_STATE:
      return toggleLogoState(state);
    case CHANGE_BULB_LOCATION:
      return changeBulbLocation(state, action.bulbLocation)
    default:
      return state
  }
}

function toggleBulbState(state:IAppState) {
  let history:History[] = state.history.slice(0, state.count + 1);
    const currentState:History = history[history.length - 1];
    return {
      history: history.concat([{
        ...currentState,
        bulbState: !currentState.bulbState
      }]),
      count: history.length
    }
}

function toggleLogoState(state:IAppState) {
  console.log("state",state);
  
  let history:History[] = state.history.slice(0, state.count + 1);
      const currentState:History = history[history.length - 1];
      // console.log("bulb state", history, currentState);
      history.push({
        ...currentState,
        logoState: !currentState.logoState
      });
      return {
        history: history,
        count: history.length
      }
}

function changeBulbLocation(state:IAppState, bulbLocation){
  let history:History[] = state.history.slice(0, state.count + 1);
  const currentState:History = history[history.length - 1];
  return {
    history: history.concat([{
      ...currentState,
      bulbLocation: bulbLocation
    }]),
    count: history.length    
  }
}