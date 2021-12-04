/*******************************************************************************
 * rootReducer store - This file includes the slices that will use in React-Redux
 *******************************************************************************
 */
import { combineReducers } from "redux";

import authReducer from "../slices/auth";

const rootReducer = combineReducers({
  auth: authReducer,
});

export default rootReducer;
