import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import adminsReducer from './admins/reducer';
import positionsReducer from './positions/reducer';

const reducers = combineReducers({
  admins: adminsReducer,
  positions: positionsReducer
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducers, enhancer);
