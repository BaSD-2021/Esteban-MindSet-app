import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/logOnlyInProduction';
import adminsReducer from './admins/reducer';
import positionsReducer from './positions/reducer';
import interviewsReducer from './interviews/reducer';
import psychologistReducer from './psychologists/reducer';
import sessionsReducer from './sessions/reducer';
import profilesReducer from './profiles/reducer';
import clientsReducer from './clients/reducer';
import applicationsReducer from './applications/reducer';
import { postulantsReducer } from './postulants/reducer';
import thunk from 'redux-thunk';

const reducers = combineReducers({
  admins: adminsReducer,
  sessions: sessionsReducer,
  profiles: profilesReducer,
  clients: clientsReducer,
  psychologists: psychologistReducer,
  applications: applicationsReducer,
  positions: positionsReducer,
  interviews: interviewsReducer,
  postulants: postulantsReducer
});

export const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)));
