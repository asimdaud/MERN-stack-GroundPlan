import { combineReducers } from 'redux';

import posts from './posts';
import auth from './auth';
import groundplan from './groundplan';

export const reducers = combineReducers({ posts, auth, groundplan });