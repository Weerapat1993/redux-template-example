import { useEffect, useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeSelectPostByUserId, fetchPostByUserId } from '../redux/postSlice'

export const usePostList = (userId) => {
  const selectPostByUserId = useMemo(makeSelectPostByUserId, [])
  // Reducer
  const post = useSelector(selectPostByUserId)
  const dispatch = useDispatch()
  const postExpensive = useCallback(post, [post]);
  const refetch = useCallback((key) => dispatch(fetchPostByUserId(key)), [dispatch])
  useEffect(() => {
    if(userId) {
      // ComponentDidUpdate
      refetch(userId);
    }
  }, [userId, refetch]); // shouldComponentUpdate
  return { post: postExpensive, refetch };
}