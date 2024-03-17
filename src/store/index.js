import { configureStore } from "@reduxjs/toolkit";
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from "react-redux";

import rootReducer from './reducer'
import { getDefaultNormalizer } from "@testing-library/react";

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false, immutableCheck: false })
})

const {dispatch} = store;

const useDispatch = () => useAppDispatch();
const useSelector = () => useAppSelector();

export {store, useDispatch, useSelector, dispatch}