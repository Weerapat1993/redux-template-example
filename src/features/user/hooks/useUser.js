import { useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { request, success, failure, makeSelectUserById } from '../redux/userSlice'

export const useUser = (userId) => {
  const selectUserById = useMemo(makeSelectUserById, [])
  // Reducer
  const user = useSelector(selectUserById)
  const dispatch = useDispatch()
  const userExpensive = useCallback(user, [user]);
  const refetch = useCallback((key) => {
    dispatch(request({ key }));
    return axios(`https://jsonplaceholder.typicode.com/users/${key}`)
      .then(({ data }) => dispatch(success({ data, key })))
      .catch(error => dispatch(failure({ error, key })))
  }, [dispatch]);
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { user: userExpensive, refetch };
}