import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import adminsReducer from './admins/reducer';
import psychologistReducer from './psychologists/reducer';

const reducers = combineReducers({
  admins: adminsReducer,
  psychologists: psychologistReducer
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducers, enhancer);
