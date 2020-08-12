import get from 'lodash/get'
import { createSlice } from '@reduxjs/toolkit';
import { createDeepEqualSelector } from '../reselect';

export const querySlice = (name) => createSlice({
  name,
  initialState: {
    keys: {}
  },
  reducers: {
    request: (state, action) => {
      const { key } = action.payload
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = true;
      state.keys[key].isLoaded = false;
      state.keys[key].error = ''
    },
    success: (state, action) => {
      const { key, data } = action.payload
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = false;
      state.keys[key].isLoaded = true;
      state.keys[key].data = data;
      state.keys[key].error = ''
    },
    failure: (state, action) => {
      const { key, error } = action.payload
      if(!state.keys[key]) {
        state.keys[key] = {};
      }
      state.keys[key].loading = false;
      state.keys[key].isLoaded = false;
      state.keys[key].error = error.message;
    },
  },
});

export const querySelector = reducerName => state => {
  const defaultState = {
    loading: false,
    error: '',
    isLoaded: false,
    data: [], 
  }
  // return (key, path, defaultValue) => path ? get(state, `${reducerName}.keys.${key}.${path}`, defaultValue) : get(state, `${reducerName}.keys.${key}`, defaultState)
  return createDeepEqualSelector(
    (key, path, defaultValue) => path ? get(state, `${reducerName}.keys.${key}.${path}`, defaultValue) : get(state, `${reducerName}.keys.${key}`, defaultState),
    (value) => value
  )
};
