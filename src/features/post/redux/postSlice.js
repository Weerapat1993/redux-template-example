import { querySlice } from '../../../utils/redux/toolkit';
import { createSelector } from 'reselect';
import get from 'lodash/get'
import axios from 'axios';

const defaultState = {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
}


export const postSlice = querySlice('post')
export const { request, success, failure } = postSlice.actions;

// Async Actions
export const fetchPostByUserId = (key) => (dispatch) => {
  dispatch(request({ key }));
  return axios(`https://jsonplaceholder.typicode.com/posts?userId=${key}`)
    .then(({ data }) => dispatch(success({ data, key })))
    .catch(error => dispatch(failure({ error, key })))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectPostByUserId = createSelector(
  state => state.post.keys,
  (state) => (key, path, defaultValue) => path ? get(state, `${key}.${path}`, defaultValue) : get(state, key, defaultState)
)

// Selector for useMemo
export const makeSelectPostByUserId = () => selectPostByUserId

export default postSlice.reducer;
