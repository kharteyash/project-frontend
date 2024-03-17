import { combineReducers } from "redux";

import userReducer from './slices/userReducer';

const reducer = combineReducers({
    userState: userReducer,
})

export default reducer;