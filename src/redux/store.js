import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
// import adminsReducer from './admins/reducer';
// import applicationsReducer from './applications/reducer';
// import clientsReducer from './clients/reducer';
// import interviewsReducer from './interviews/reducer';
// import positionsReducer from './positions/reducer';
// import postulantsReducer from './postulants/reducer';
// import profilesReducer from './profiles/reducer';
// import psychologistsReducers from './psychologists/reducer';
// import sessionsReducer from './sessions/reducer';

const reducers = combineReducers({
  // admins: adminsReducer,
  // applications: applicationsReducer,
  // clients: clientsReducer,
  // interviews: interviewsReducer,
  // positions: positionsReducer,
  // postulants: postulantsReducer,
  // profiles: profilesReducer,
  // psychologists: psychologistsReducers,
  // sessions: sessionsReducer
});

const enhancer = composeWithDevTools(applyMiddleware(thunk));

export const store = createStore(reducers, enhancer);
