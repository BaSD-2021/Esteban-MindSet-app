import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import adminsReducer from './admins/reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  admins: adminsReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
