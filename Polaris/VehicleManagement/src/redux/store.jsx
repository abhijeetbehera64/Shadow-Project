import {createStore, combineReducers } from 'redux';
import GetReducer from './reducer';
 
const rootReducer = combineReducers({
  getdata:GetReducer
});
 export const store=createStore(rootReducer)