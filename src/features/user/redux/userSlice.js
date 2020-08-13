import axios from 'axios'
import { querySlice } from '../../../utils/redux/toolkit';
import { createSelector } from 'reselect';
import get from 'lodash/get'

const defaultState = {
  loading: false,
  error: '',
  isLoaded: false,
  data: [], 
}

export const userSlice = querySlice('user')
export const { request, success, failure } = userSlice.actions;

// Async Actions
export const fetchUserById = (key) => (dispatch) => {
  dispatch(request({ key }));
  return axios(`https://jsonplaceholder.typicode.com/users/${key}`)
    .then(({ data }) => dispatch(success({ data, key })))
    .catch(error => dispatch(failure({ error, key })))
}

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectUserById = createSelector(
  state => state.user.keys,
  (state) => (key, path, defaultValue) => path ? get(state, `${key}.${path}`, defaultValue) : get(state, key, defaultState)
)

// Selector for useMemo
export const makeSelectUserById = () => selectUserById

export default userSlice.reducer;
