import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserById, makeSelectUserById } from '../redux/userSlice'

export const useUser = (userId) => {
  const selectUserById = useMemo(makeSelectUserById, [])
  // Reducer
  const user = useSelector(selectUserById)
  const dispatch = useDispatch()
  const userExpensive = useCallback(user, [user]);
  const refetch = useCallback((key) => dispatch(fetchUserById(key)), [dispatch])
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { user: userExpensive, refetch };
}