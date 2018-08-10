import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import app from './app';
import role from './role';
import person from './person';
import course from './course';
import paper from './paper';

const rootReducer = combineReducers({
  router: routerReducer,
  form: formReducer,
  app,
  role,
  person,
  course,
  paper,
});

export default rootReducer;
